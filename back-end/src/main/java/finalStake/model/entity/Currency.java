package finalStake.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "currencies")
public class Currency {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 3)
    private String code;

    @Column(nullable = false)
    private String name;

    @Column(name = "buying_conversion", nullable = false, precision = 19, scale = 6)
    private BigDecimal buyingConversion;

    @Column(name = "selling_conversion", nullable = false, precision = 19, scale = 6)
    private BigDecimal sellingConversion;
}
