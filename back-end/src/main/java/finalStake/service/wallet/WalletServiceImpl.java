package finalStake.service.wallet;

import finalStake.dto.wallet.WalletViewDTO;
import finalStake.model.entity.User;
import finalStake.model.entity.Wallet;
import finalStake.repository.UserRepository;
import finalStake.repository.WalletRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;

import java.util.UUID;
@Service
@RequiredArgsConstructor
public class WalletServiceImpl implements WalletService {

    private final WalletRepository walletRepository;
    private final UserRepository userRepository;

    @Override
    public WalletViewDTO getMyWallet() {

        // 1. Luăm username-ul din context
        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        String username = authentication.getName();

        // 2. Găsim userul
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalStateException("userNotFound"));

        // 3. Găsim wallet-ul DUPĂ USER, NU DUPĂ UUID
        Wallet wallet = walletRepository.findByUser(user)
                .orElseThrow(() -> new IllegalStateException("walletNotFound"));

        String currency = "RON";

        return new WalletViewDTO(wallet.getBalance(), currency);
    }
}
