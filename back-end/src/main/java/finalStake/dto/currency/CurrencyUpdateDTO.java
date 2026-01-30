package finalStake.dto.currency;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CurrencyUpdateDTO {

    @NotNull(message = "Buying conversion rate is required")
    @Positive(message = "Buying conversion rate must be positive")
    private BigDecimal buyingConversion;

    @NotNull(message = "Selling conversion rate is required")
    @Positive(message = "Selling conversion rate must be positive")
    private BigDecimal sellingConversion;
}
