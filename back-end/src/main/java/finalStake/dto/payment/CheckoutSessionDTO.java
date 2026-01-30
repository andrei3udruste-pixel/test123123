package finalStake.dto.payment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CheckoutSessionDTO {
    private String checkoutUrl;
    private String sessionId;
}
