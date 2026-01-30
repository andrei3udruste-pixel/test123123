package finalStake.service.payment;

import com.stripe.Stripe;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.stripe.param.checkout.SessionCreateParams;
import finalStake.dto.payment.CheckoutSessionDTO;
import finalStake.dto.payment.PaymentCreateDTO;
import finalStake.dto.payment.PaymentViewDTO;
import finalStake.mapper.PaymentMapper;
import finalStake.model.entity.Currency;
import finalStake.model.entity.Payment;
import finalStake.model.entity.User;
import finalStake.model.entity.Wallet;
import finalStake.model.enums.PaymentStatus;
import finalStake.repository.CurrencyRepository;
import finalStake.repository.PaymentRepository;
import finalStake.repository.UserRepository;
import finalStake.repository.WalletRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.annotation.PostConstruct;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;
    private final WalletRepository walletRepository;
    private final CurrencyRepository currencyRepository;
    private final PaymentMapper paymentMapper;

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    @Value("${stripe.webhook.secret}")
    private String stripeWebhookSecret;

    @Value("${stripe.success.url}")
    private String successUrl;

    @Value("${stripe.cancel.url}")
    private String cancelUrl;

    public PaymentServiceImpl(
            PaymentRepository paymentRepository,
            UserRepository userRepository,
            WalletRepository walletRepository,
            CurrencyRepository currencyRepository,
            PaymentMapper paymentMapper
    ) {
        this.paymentRepository = paymentRepository;
        this.userRepository = userRepository;
        this.walletRepository = walletRepository;
        this.currencyRepository = currencyRepository;
        this.paymentMapper = paymentMapper;
    }

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeApiKey;
    }

    private String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null) {
            throw new RuntimeException("Unauthorized");
        }
        return authentication.getName();
    }

    @Override
    @Transactional
    public CheckoutSessionDTO createCheckoutSession(PaymentCreateDTO dto) {
        if (dto.getAmount() == null || dto.getAmount().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Payment amount must be greater than 0");
        }

        String username = getCurrentUsername();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("userNotFound"));

        Currency currency = currencyRepository.findByCode(dto.getCurrencyCode())
                .orElseThrow(() -> new IllegalArgumentException("currencyNotFound"));

        // Calculate stakes using buying conversion rate
        BigDecimal stakesAmount = dto.getAmount().multiply(currency.getBuyingConversion())
                .setScale(2, RoundingMode.HALF_UP);

        // Create payment record in PENDING status
        Payment payment = new Payment();
        payment.setUser(user);
        payment.setUsername(user.getUsername());
        payment.setAmount(dto.getAmount());
        payment.setCurrency(currency);
        payment.setConvertedAmount(stakesAmount);
        payment.setStatus(PaymentStatus.PENDING);

        payment = paymentRepository.save(payment);

        try {
            // Create Stripe Checkout Session
            SessionCreateParams params = SessionCreateParams.builder()
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl(successUrl + "?session_id={CHECKOUT_SESSION_ID}")
                    .setCancelUrl(cancelUrl)
                    .setClientReferenceId(payment.getId().toString())
                    .addLineItem(
                            SessionCreateParams.LineItem.builder()
                                    .setQuantity(1L)
                                    .setPriceData(
                                            SessionCreateParams.LineItem.PriceData.builder()
                                                    .setCurrency(currency.getCode().toLowerCase())
                                                    .setUnitAmount(dto.getAmount().multiply(BigDecimal.valueOf(100)).longValue())
                                                    .setProductData(
                                                            SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                    .setName("Stakes Purchase")
                                                                    .setDescription(String.format("%.2f Stakes", stakesAmount))
                                                                    .build()
                                                    )
                                                    .build()
                                    )
                                    .build()
                    )
                    .build();

            Session session = Session.create(params);

            payment.setStripeCheckoutSessionId(session.getId());
            paymentRepository.save(payment);

            return new CheckoutSessionDTO(session.getUrl(), session.getId());

        } catch (StripeException e) {
            payment.setStatus(PaymentStatus.FAILED);
            paymentRepository.save(payment);
            throw new RuntimeException("Failed to create Stripe checkout session: " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public void handleStripeWebhook(String payload, String sigHeader) {
        Event event;
        try {
            event = Webhook.constructEvent(payload, sigHeader, stripeWebhookSecret);
        } catch (SignatureVerificationException e) {
            throw new RuntimeException("Invalid Stripe signature");
        }

        if ("checkout.session.completed".equals(event.getType())) {
            EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();
            Session session;
            
            if (dataObjectDeserializer.getObject().isPresent()) {
                session = (Session) dataObjectDeserializer.getObject().get();
            } else {
                // Fallback: force deserialization with current API version
                try {
                    session = (Session) dataObjectDeserializer.deserializeUnsafe();
                } catch (Exception e) {
                    throw new RuntimeException("Failed to deserialize Stripe session: " + e.getMessage());
                }
            }

            Payment payment = paymentRepository.findByStripeCheckoutSessionId(session.getId())
                    .orElseThrow(() -> new RuntimeException("Payment not found for session: " + session.getId()));

            if (payment.getStatus() == PaymentStatus.PENDING) {
                payment.setStatus(PaymentStatus.COMPLETED);
                payment.setStripePaymentIntentId(session.getPaymentIntent());
                payment.setCompletedAt(LocalDateTime.now());
                paymentRepository.save(payment);

                // Add stakes to user's wallet
                Wallet wallet = walletRepository.findByUser(payment.getUser())
                        .orElseThrow(() -> new IllegalStateException("walletNotFound"));

                wallet.setBalance(wallet.getBalance().add(payment.getConvertedAmount()));
                walletRepository.save(wallet);
            }
        } else if ("checkout.session.expired".equals(event.getType()) ||
                   "payment_intent.payment_failed".equals(event.getType())) {
            EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();
            Session session = null;
            
            if (dataObjectDeserializer.getObject().isPresent()) {
                session = (Session) dataObjectDeserializer.getObject().get();
            }

            if (session != null) {
                paymentRepository.findByStripeCheckoutSessionId(session.getId())
                        .ifPresent(payment -> {
                            if (payment.getStatus() == PaymentStatus.PENDING) {
                                payment.setStatus(PaymentStatus.FAILED);
                                paymentRepository.save(payment);
                            }
                        });
            }
        }
    }

    @Override
    public Page<PaymentViewDTO> getMyPayments(Pageable pageable) {
        String username = getCurrentUsername();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("userNotFound"));

        return paymentRepository.findByUser(user, pageable)
                .map(paymentMapper::toViewDto);
    }

    @Override
    public Page<PaymentViewDTO> getAll(Pageable pageable) {
        return paymentRepository.findAll(pageable)
                .map(paymentMapper::toViewDto);
    }
}
