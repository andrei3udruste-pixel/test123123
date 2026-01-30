package finalStake.controller;

import finalStake.dto.payment.CheckoutSessionDTO;
import finalStake.dto.payment.PaymentCreateDTO;
import finalStake.dto.payment.PaymentViewDTO;
import finalStake.response.BaseResponse;
import finalStake.response.PageResponse;
import finalStake.service.payment.PaymentService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@Tag(name = "Payment")
@RequiredArgsConstructor
@RequestMapping("/api/payment")
@SecurityRequirement(name = "Authentication")
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/checkout")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<BaseResponse<CheckoutSessionDTO>> createCheckout(@Valid @RequestBody PaymentCreateDTO dto) {
        var result = paymentService.createCheckoutSession(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(new BaseResponse<>(result));
    }

    @PostMapping("/webhook")
    public ResponseEntity<Void> handleWebhook(
            @RequestBody String payload,
            @RequestHeader("Stripe-Signature") String sigHeader
    ) {
        paymentService.handleStripeWebhook(payload, sigHeader);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<PageResponse<PaymentViewDTO>> getMyPayments(@ParameterObject Pageable pageable) {
        var page = paymentService.getMyPayments(pageable);
        return ResponseEntity.status(HttpStatus.OK).body(new PageResponse<>(page));
    }

    @Tag(name = "Admin")
    @GetMapping("/admin/search")
    @PreAuthorize("hasAnyRole('ADMIN','ACCOUNTING')")
    public ResponseEntity<PageResponse<PaymentViewDTO>> searchAdmin(@ParameterObject Pageable pageable) {
        var page = paymentService.getAll(pageable);
        return ResponseEntity.status(HttpStatus.OK).body(new PageResponse<>(page));
    }
}
