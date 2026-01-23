package finalStake.repository;

import finalStake.model.entity.Withdrawal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface WithdrawalRepository extends JpaRepository<Withdrawal, UUID> {

    /**
     * Returns all withdrawals for a specific user.
     */
    //Page<Withdrawal> findByUserId(UUID userId, Pageable pageable);
    Page<Withdrawal> findByUserUsername(String username, Pageable pageable);
}
