package finalStake.controller;

import finalStake.dto.currency.CurrencyUpdateDTO;
import finalStake.dto.currency.CurrencyViewDTO;
import finalStake.response.BaseResponse;
import finalStake.service.currency.CurrencyService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/currency")
@RequiredArgsConstructor
@Tag(name = "Currency")
@SecurityRequirement(name = "Authentication")
public class CurrencyController {

    private final CurrencyService currencyService;

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public BaseResponse<List<CurrencyViewDTO>> findAll() {
        return new BaseResponse<>(currencyService.findAll());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public BaseResponse<CurrencyViewDTO> findById(@PathVariable Long id) {
        return new BaseResponse<>(currencyService.findById(id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public BaseResponse<CurrencyViewDTO> update(
            @PathVariable Long id,
            @Valid @RequestBody CurrencyUpdateDTO dto
    ) {
        return new BaseResponse<>(currencyService.update(id, dto));
    }
}
