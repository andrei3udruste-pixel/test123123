package finalStake.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import finalStake.model.entity.User;
import finalStake.model.entity.VerificationToken;

import java.util.UUID;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, UUID> {
    void deleteAllByUser(User user);
}
