package finalStake.dto.currency;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CurrencyViewDTO {
    private Long id;
    private String code;
    private String name;
    private BigDecimal buyingConversion;
    private BigDecimal sellingConversion;
}
