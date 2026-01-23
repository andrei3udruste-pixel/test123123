package finalStake.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Role {
    USER("ROLE_USER"),
    ADMIN("ROLE_ADMIN"),
    ACCOUNTING("ROLE_ACCOUNTING");


    private final String name;

    @Override
    public String toString() {
        return name;
    }
}
