package finalStake.repository;

import finalStake.model.entity.Payment;
import finalStake.model.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, UUID> {

    Page<Payment> findByUser(User user, Pageable pageable);

    Optional<Payment> findByStripeCheckoutSessionId(String sessionId);

    Optional<Payment> findByStripePaymentIntentId(String paymentIntentId);
}
