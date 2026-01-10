package finalStake.dto.user;

import jakarta.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateAdminDTO {
    @NotNull
    private Boolean enabled;

    @NotNull
    private Boolean locked;

    @NotNull
    private List<String> roles;
}
