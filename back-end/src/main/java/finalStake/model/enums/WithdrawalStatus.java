package finalStake.model.enums;

/**
 * Withdrawal lifecycle status.
 * PENDING   - user created a withdrawal request; waiting for review.
 * APPROVED  - admin approved the request (can be paid out).
 * REJECTED  - admin rejected the request (optionally with a reason).
 * PAID      - the withdrawal has been paid out (final state).
 */
public enum WithdrawalStatus {
    PENDING,
    APPROVED,
    REJECTED,
    PAID
}
