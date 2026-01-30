package finalStake.dto.payment;

import finalStake.model.enums.PaymentStatus;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
public class PaymentViewDTO {

    private UUID id;
    private String username;
    private BigDecimal amount;
    private String currencyCode;
    private BigDecimal convertedAmount;
    private PaymentStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime completedAt;
}
