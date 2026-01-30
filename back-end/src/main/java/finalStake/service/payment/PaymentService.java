package finalStake.service.payment;

import finalStake.dto.payment.CheckoutSessionDTO;
import finalStake.dto.payment.PaymentCreateDTO;
import finalStake.dto.payment.PaymentViewDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PaymentService {

    CheckoutSessionDTO createCheckoutSession(PaymentCreateDTO dto);

    void handleStripeWebhook(String payload, String sigHeader);

    Page<PaymentViewDTO> getMyPayments(Pageable pageable);

    Page<PaymentViewDTO> getAll(Pageable pageable);
}
