package finalStake.repository;

import finalStake.model.entity.Withdrawal;
import finalStake.model.enums.WithdrawalStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface WithdrawalRepository extends JpaRepository<Withdrawal, UUID> {

    Page<Withdrawal> findByUserUsernameOrderByCreatedAtDesc(String username, Pageable pageable);
    Page<Withdrawal> findByStatusOrderByCreatedAtDesc(WithdrawalStatus status, Pageable pageable);

    Page<Withdrawal> findByStatusAndUserUsernameContainingIgnoreCaseOrderByCreatedAtDesc(
            WithdrawalStatus status,
            String username,
            Pageable pageable
    );

    Page<Withdrawal> findByUserUsernameContainingIgnoreCaseOrderByCreatedAtDesc(
            String username,
            Pageable pageable
    );

    Page<Withdrawal> findAllByOrderByCreatedAtDesc(Pageable pageable);

}
