package finalStake.dto.withdrawal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;

public class WithdrawalCreateDTO {

    @NotNull(message = "amountIsRequired")
    @Positive(message = "amountMustBePositive")
    private BigDecimal amount;

    @NotBlank(message = "payoutMethodIsRequired")
    private String payoutMethod;

    @NotBlank(message = "payoutDetailsIsRequired")
    private String payoutDetails;

    /* =====================
       Getters & Setters
       ===================== */

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
}
