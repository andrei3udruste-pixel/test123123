package finalStake.service.role;

import finalStake.model.entity.Role;
import finalStake.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;

    @Override
    public List<String> getAllRoles() {
        return roleRepository.findAll()
                .stream()
                .map(Role::getName)
                .toList();
    }
}
