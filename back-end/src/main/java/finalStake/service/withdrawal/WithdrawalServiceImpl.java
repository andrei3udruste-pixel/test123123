package finalStake.service.withdrawal;

import finalStake.dto.withdrawal.WithdrawalAdminUpdateDTO;
import finalStake.dto.withdrawal.WithdrawalCreateDTO;
import finalStake.dto.withdrawal.WithdrawalViewDTO;
import finalStake.mapper.WithdrawalMapper;
import finalStake.model.entity.User;
import finalStake.model.entity.Wallet;
import finalStake.model.entity.Withdrawal;
import finalStake.model.enums.WithdrawalStatus;
import finalStake.repository.UserRepository;
import finalStake.repository.WalletRepository;
import finalStake.repository.WithdrawalRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class WithdrawalServiceImpl implements WithdrawalService {

    private final WithdrawalRepository withdrawalRepository;
    private final UserRepository userRepository;
    private final WalletRepository walletRepository;
    private final WithdrawalMapper withdrawalMapper;

    public WithdrawalServiceImpl(
            WithdrawalRepository withdrawalRepository,
            UserRepository userRepository,
            WalletRepository walletRepository,
            WithdrawalMapper withdrawalMapper
    ) {
        this.withdrawalRepository = withdrawalRepository;
        this.userRepository = userRepository;
        this.walletRepository = walletRepository;
        this.withdrawalMapper = withdrawalMapper;
    }

//    private UUID getCurrentUserId() {
//        Authentication authentication = SecurityContextHolder
//                .getContext()
//                .getAuthentication();
//
//        return UUID.fromString(authentication.getName());
//    }
    private String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null) {
            throw new RuntimeException("Unauthorized");
        }
        return authentication.getName(); // username
    }


    /**
     * USER: create withdrawal
     */
    @Override
    @Transactional
    public WithdrawalViewDTO create(WithdrawalCreateDTO dto) {

        // 1️⃣ Validare sumă
        if (dto.getAmount() == null || dto.getAmount().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Withdrawal amount must be greater than 0");
        }

        String username = getCurrentUsername();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("userNotFound"));


        Wallet wallet = walletRepository.findByUser(user)
                .orElseThrow(() -> new IllegalStateException("walletNotFound"));

        // 2️⃣ Verificare fonduri
        if (wallet.getBalance().compareTo(dto.getAmount()) < 0) {
            throw new IllegalArgumentException("insufficientBalance");
        }

        // 3️⃣ Scade banii (blocare)
        wallet.setBalance(wallet.getBalance().subtract(dto.getAmount()));
        walletRepository.save(wallet);

        // 4️⃣ Creează withdrawal
        Withdrawal withdrawal = new Withdrawal();
        withdrawal.setUser(user);
        withdrawal.setAmount(dto.getAmount());
        withdrawal.setPayoutMethod(dto.getPayoutMethod());
        withdrawal.setPayoutDetails(dto.getPayoutDetails());
        withdrawal.setStatus(WithdrawalStatus.PENDING);

        Withdrawal saved = withdrawalRepository.save(withdrawal);

        return withdrawalMapper.toViewDto(saved);
    }

    /**
     * USER: list my withdrawals
     */
    @Override
    @Transactional(readOnly = true)
    public Page<WithdrawalViewDTO> getMyWithdrawals(Pageable pageable) {

        String username = getCurrentUsername();

        return withdrawalRepository
                .findByUserUsername(username, pageable)
                .map(withdrawalMapper::toViewDto);
    }

    /**
     * ADMIN: list all withdrawals
     */
    @Override
    @Transactional(readOnly = true)
    public Page<WithdrawalViewDTO> getAll(Pageable pageable) {

        return withdrawalRepository
                .findAll(pageable)
                .map(withdrawalMapper::toViewDto);
    }

    /**
     * ADMIN: update withdrawal status
     */
    @Override
    @Transactional
    public void updateStatus(UUID withdrawalId, WithdrawalAdminUpdateDTO dto) {

        Withdrawal withdrawal = withdrawalRepository.findById(withdrawalId)
                .orElseThrow(() -> new RuntimeException("withdrawalNotFound"));

        validateStatusTransition(withdrawal.getStatus(), dto.getStatus());

        // Dacă admin respinge → returnăm banii
        if (withdrawal.getStatus() == WithdrawalStatus.PENDING
                && dto.getStatus() == WithdrawalStatus.REJECTED) {

            Wallet wallet = walletRepository.findByUser(
                    withdrawal.getUser()
            ).orElseThrow(() -> new IllegalStateException("walletNotFound"));

            wallet.setBalance(
                    wallet.getBalance().add(withdrawal.getAmount())
            );

            walletRepository.save(wallet);
        }

        withdrawal.setStatus(dto.getStatus());
        withdrawal.setAdminNote(dto.getAdminNote());
        withdrawal.setProcessedAt(LocalDateTime.now());

        withdrawalRepository.save(withdrawal);
    }

    /**
     * Business rules for withdrawal lifecycle.
     */
    private void validateStatusTransition(
            WithdrawalStatus current,
            WithdrawalStatus next
    ) {
        if (current == WithdrawalStatus.PENDING) {
            if (next == WithdrawalStatus.APPROVED || next == WithdrawalStatus.REJECTED) {
                return;
            }
        }

        if (current == WithdrawalStatus.APPROVED && next == WithdrawalStatus.PAID) {
            return;
        }

        throw new RuntimeException("invalidWithdrawalStatusTransition");
    }
}
