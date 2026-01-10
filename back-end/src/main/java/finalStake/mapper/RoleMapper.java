package finalStake.mapper;

import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Named;
import finalStake.model.entity.Role;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    @Named("roleToString")
    default String roleToString(Role role) {
        return role != null ? role.getName() : null;
    }

    @IterableMapping(qualifiedByName = "roleToString")
    List<String> rolesToStrings(List<Role> roles);
}
