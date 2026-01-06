package finalStake.config;

import finalStake.model.entity.Role;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import finalStake.model.entity.User;
import finalStake.repository.RoleRepository;
import finalStake.repository.UserRepository;

import java.util.HashSet;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataConfig implements ApplicationRunner {
    @Value("${com.finalStake.admin.username}")
    private String adminUsername;

    @Value("${com.finalStake.admin.email}")
    private String adminEmail;

    @Value("${com.finalStake.admin.password}")
    private String adminPassword;

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) {
        Set<Role> unsavedRoles = new HashSet<>();
        for (var authority : finalStake.model.enums.Role.values()) {
            if (!roleRepository.existsByName(authority.getName())) {
                unsavedRoles.add(
                        new Role(
                                null,
                                authority.getName()
                        )
                );
            }
        }
        roleRepository.saveAll(unsavedRoles);

        var allRoles = new HashSet<>(roleRepository.findAll());
        if (!userRepository.existsByUsername(adminUsername) && !userRepository.existsByEmail(adminEmail)) {
            var user = User.builder()
                    .password(passwordEncoder.encode(adminPassword))
                    .username(adminUsername)
                    .email(adminEmail)
                    .enabled(true)
                    .locked(false)
                    .roles(allRoles)
                    .build();

            userRepository.save(user);
        }
    }
}