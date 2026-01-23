package finalStake.model.entity;

import finalStake.model.enums.WithdrawalStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Entity
@Table(name = "withdrawals")
public class Withdrawal {

    @Setter
    @Id
    @GeneratedValue
    private UUID id;

    /**
     * User who requested the withdrawal.
     */
    @Setter
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    /**
     * Amount requested to be withdrawn.
     */
    @Setter
    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal amount;

    /**
     * Payout method (e.g. IBAN, CARD, CRYPTO).
     */
    @Setter
    @Column(name = "payout_method", nullable = false)
    private String payoutMethod;

    /**
     * Payout details (e.g. IBAN number).
     */
    @Setter
    @Column(name = "payout_details", nullable = false)
    private String payoutDetails;

    /**
     * Current status of the withdrawal.
     */
    @Setter
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private WithdrawalStatus status;

    /**
     * Timestamp when the withdrawal was created.
     */
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    /**
     * Timestamp when the withdrawal was processed by an admin.
     */
    @Setter
    @Column(name = "processed_at")
    private LocalDateTime processedAt;

    /**
     * Optional admin note (rejection reason, comments).
     */
    @Setter
    @Column(name = "admin_note")
    private String adminNote;

    /* =====================
       Constructors
       ===================== */

    public Withdrawal() {
    }

    public void setUsername(String username) {
        this.user.setUsername(username);
    }

    /* =====================
       Getters & Setters
       ===================== */

}
