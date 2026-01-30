package finalStake.controller;

import finalStake.dto.wallet.WalletViewDTO;
import finalStake.response.BaseResponse;
import finalStake.service.wallet.WalletService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wallet")
@RequiredArgsConstructor
@Tag(name = "Wallet")
@SecurityRequirement(name = "Authentication")
@PreAuthorize("hasRole('USER')")
public class WalletController {

    private final WalletService walletService;

    @GetMapping("/my")
    public BaseResponse<WalletViewDTO> getMyWallet() {
        return new BaseResponse<>(walletService.getMyWallet());
    }
}
