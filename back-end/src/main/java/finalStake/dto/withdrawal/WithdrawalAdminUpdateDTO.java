package finalStake.dto.withdrawal;

import finalStake.model.enums.WithdrawalStatus;
import jakarta.validation.constraints.NotNull;

public class WithdrawalAdminUpdateDTO {

    @NotNull(message = "statusIsRequired")
    private WithdrawalStatus status;

    private String adminNote;

    /* =====================
       Getters & Setters
       ===================== */

    public WithdrawalStatus getStatus() {
        return status;
    }

    public void setStatus(WithdrawalStatus status) {
        this.status = status;
    }

    public String getAdminNote() {
        return adminNote;
    }

    public void setAdminNote(String adminNote) {
        this.adminNote = adminNote;
    }
}
