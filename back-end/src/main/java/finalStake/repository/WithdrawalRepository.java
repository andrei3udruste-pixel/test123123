package finalStake.repository;

import finalStake.model.entity.Withdrawal;
import finalStake.model.enums.WithdrawalStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface WithdrawalRepository extends JpaRepository<Withdrawal, UUID> {

    Page<Withdrawal> findByUserUsername(String username, Pageable pageable);
    Page<Withdrawal> findByStatus(WithdrawalStatus status, Pageable pageable);

    Page<Withdrawal> findByStatusAndUserUsernameContainingIgnoreCase(
            WithdrawalStatus status,
            String username,
            Pageable pageable
    );

}
