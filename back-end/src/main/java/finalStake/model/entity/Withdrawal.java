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


    @Setter
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Setter
    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal amount;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "currency_id")
    private Currency currency;

    @Setter
    @Column(name = "converted_amount", precision = 19, scale = 2)
    private BigDecimal convertedAmount;

    @Setter
    @Column(name = "payout_method", nullable = false)
    private String payoutMethod;

    @Setter
    @Column(name = "payout_details", nullable = false)
    private String payoutDetails;

    @Setter
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private WithdrawalStatus status;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Setter
    @Column(name = "processed_at")
    private LocalDateTime processedAt;

    @Setter
    @Column(name = "admin_note")
    private String adminNote;


    public Withdrawal() {
    }

    public void setUsername(String username) {
        this.user.setUsername(username);
    }


}
