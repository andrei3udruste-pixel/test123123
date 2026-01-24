package finalStake.service.withdrawal;

import finalStake.dto.withdrawal.WithdrawalAdminUpdateDTO;
import finalStake.dto.withdrawal.WithdrawalCreateDTO;
import finalStake.dto.withdrawal.WithdrawalViewDTO;
import finalStake.model.enums.WithdrawalStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface WithdrawalService {


    WithdrawalViewDTO create(WithdrawalCreateDTO dto);

    Page<WithdrawalViewDTO> getMyWithdrawals(Pageable pageable);

    Page<WithdrawalViewDTO> getAll(Pageable pageable);

    void updateStatus(UUID withdrawalId, WithdrawalAdminUpdateDTO dto);
    WithdrawalViewDTO getOneAdmin(UUID id);
    Page<WithdrawalViewDTO> adminSearch(
            WithdrawalStatus status,
            String username,
            Pageable pageable
    );

}
