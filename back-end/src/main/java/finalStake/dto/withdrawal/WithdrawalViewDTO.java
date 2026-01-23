package finalStake.dto.withdrawal;

import finalStake.model.enums.WithdrawalStatus;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Setter
@Getter
public class WithdrawalViewDTO {

    private UUID id;
    private String username;
    private BigDecimal amount;
    private String payoutMethod;
    private String payoutDetails;
    private WithdrawalStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime processedAt;
    private String adminNote;

    /* =====================
       Getters & Setters
       ===================== */

}
