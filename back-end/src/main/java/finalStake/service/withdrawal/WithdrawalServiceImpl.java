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

    private String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null) {
            throw new RuntimeException("Unauthorized");
        }
        return authentication.getName(); // username
    }


    @Override
    @Transactional
    public WithdrawalViewDTO create(WithdrawalCreateDTO dto) {


        if (dto.getAmount() == null || dto.getAmount().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Withdrawal amount must be greater than 0");
        }

        String username = getCurrentUsername();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("userNotFound"));


        Wallet wallet = walletRepository.findByUser(user)
                .orElseThrow(() -> new IllegalStateException("walletNotFound"));


        if (wallet.getBalance().compareTo(dto.getAmount()) < 0) {
            throw new IllegalArgumentException("insufficientBalance");
        }

        wallet.setBalance(wallet.getBalance().subtract(dto.getAmount()));
        walletRepository.save(wallet);

        Withdrawal withdrawal = new Withdrawal();
        withdrawal.setUser(user);
        withdrawal.setAmount(dto.getAmount());
        withdrawal.setPayoutMethod(dto.getPayoutMethod());
        withdrawal.setPayoutDetails(dto.getPayoutDetails());
        withdrawal.setStatus(WithdrawalStatus.PENDING);
        withdrawal.setUsername(withdrawal.getUser().getUsername());

        Withdrawal saved = withdrawalRepository.save(withdrawal);

        return withdrawalMapper.toViewDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<WithdrawalViewDTO> getMyWithdrawals(Pageable pageable) {

        String username = getCurrentUsername();

        return withdrawalRepository
                .findByUserUsername(username, pageable)
                .map(withdrawalMapper::toViewDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<WithdrawalViewDTO> getAll(Pageable pageable) {

        return withdrawalRepository
                .findAll(pageable)
                .map(withdrawalMapper::toViewDto);
    }

    @Override
    @Transactional
    public void updateStatus(UUID withdrawalId, WithdrawalAdminUpdateDTO dto) {

        Withdrawal withdrawal = withdrawalRepository.findById(withdrawalId)
                .orElseThrow(() -> new RuntimeException("withdrawalNotFound"));

        validateStatusTransition(withdrawal.getStatus(), dto.getStatus());


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
    @Override
    @Transactional(readOnly = true)
    public WithdrawalViewDTO getOneAdmin(UUID id) {
        Withdrawal withdrawal = withdrawalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Withdrawal not found"));

        return withdrawalMapper.toViewDto(withdrawal);
    }
    @Override
    @Transactional(readOnly = true)
    public Page<WithdrawalViewDTO> adminSearch(
            WithdrawalStatus status,
            String username,
            Pageable pageable
    ) {
        Page<Withdrawal> page;

        boolean hasStatus = status != null;
        boolean hasUsername = username != null && !username.isBlank();

        if (hasStatus && hasUsername) {
            page = withdrawalRepository
                    .findByStatusAndUserUsernameContainingIgnoreCase(
                            status,
                            username.trim(),
                            pageable
                    );
        } else if (hasStatus) {
            page = withdrawalRepository.findByStatus(status, pageable);
        } else if (hasUsername) {
            page = withdrawalRepository
                    .findByStatusAndUserUsernameContainingIgnoreCase(status, username.trim(), pageable);
        } else {
            page = withdrawalRepository.findAll(pageable);
        }

        return page.map(withdrawalMapper::toViewDto);
    }


}
