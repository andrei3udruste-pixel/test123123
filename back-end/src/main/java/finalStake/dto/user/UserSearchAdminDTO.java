package finalStake.dto.user;

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
public class UserSearchAdminDTO implements Serializable {
    @Size(max = 40)
    private String username;

    @Size(max = 255)
    private String email;

    @Size(max = 36)
    private String id;

    private Boolean enabled;

    private Boolean locked;
}
