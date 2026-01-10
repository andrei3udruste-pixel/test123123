package finalStake.dto.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserSignInDTO implements Serializable {
    @NotBlank
    @Size(max = 40)
    private String username;

    @NotBlank
    @Size(max = 40)
    private String password;
}
