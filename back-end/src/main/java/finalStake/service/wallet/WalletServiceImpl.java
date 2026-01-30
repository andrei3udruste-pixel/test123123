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


        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        String username = authentication.getName();


        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalStateException("userNotFound"));


        Wallet wallet = walletRepository.findByUser(user)
                .orElseThrow(() -> new IllegalStateException("walletNotFound"));

        String currency = "Stakes";

        return new WalletViewDTO(wallet.getBalance(), currency);
    }
}
