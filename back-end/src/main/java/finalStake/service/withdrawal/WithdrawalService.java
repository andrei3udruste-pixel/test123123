package finalStake.service.withdrawal;

import finalStake.dto.withdrawal.WithdrawalAdminUpdateDTO;
import finalStake.dto.withdrawal.WithdrawalCreateDTO;
import finalStake.dto.withdrawal.WithdrawalViewDTO;
import finalStake.model.enums.WithdrawalStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface WithdrawalService {

    /**
     * Creates a new withdrawal request for the current user.
     */
    WithdrawalViewDTO create(WithdrawalCreateDTO dto);

    /**
     * Returns withdrawals of the currently authenticated user.
     */
    Page<WithdrawalViewDTO> getMyWithdrawals(Pageable pageable);

    /**
     * Returns all withdrawals (admin).
     */
    Page<WithdrawalViewDTO> getAll(Pageable pageable);

    /**
     * Updates withdrawal status (admin).
     */
    void updateStatus(UUID withdrawalId, WithdrawalAdminUpdateDTO dto);
    WithdrawalViewDTO getOneAdmin(UUID id);
    Page<WithdrawalViewDTO> adminSearch(
            WithdrawalStatus status,
            String username,
            Pageable pageable
    );

}
