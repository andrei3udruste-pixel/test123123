package finalStake.dto.withdrawal;

import finalStake.model.enums.WithdrawalStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public class WithdrawalViewDTO {

    private UUID id;
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

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getPayoutMethod() {
        return payoutMethod;
    }

    public void setPayoutMethod(String payoutMethod) {
        this.payoutMethod = payoutMethod;
    }

    public String getPayoutDetails() {
        return payoutDetails;
    }

    public void setPayoutDetails(String payoutDetails) {
        this.payoutDetails = payoutDetails;
    }

    public WithdrawalStatus getStatus() {
        return status;
    }

    public void setStatus(WithdrawalStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getProcessedAt() {
        return processedAt;
    }

    public void setProcessedAt(LocalDateTime processedAt) {
        this.processedAt = processedAt;
    }

    public String getAdminNote() {
        return adminNote;
    }

    public void setAdminNote(String adminNote) {
        this.adminNote = adminNote;
    }
}
