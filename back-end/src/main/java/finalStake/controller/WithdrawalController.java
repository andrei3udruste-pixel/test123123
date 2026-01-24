package finalStake.controller;

import finalStake.dto.withdrawal.WithdrawalAdminUpdateDTO;
import finalStake.dto.withdrawal.WithdrawalCreateDTO;
import finalStake.dto.withdrawal.WithdrawalViewDTO;
import finalStake.model.enums.WithdrawalStatus;
import finalStake.response.BaseResponse;
import finalStake.response.PageResponse;
import finalStake.service.withdrawal.WithdrawalService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@Tag(name = "Withdrawal")
@RequiredArgsConstructor
@RequestMapping("/api/withdrawal")
@SecurityRequirement(name = "Authentication")
public class WithdrawalController {

    private final WithdrawalService withdrawalService;

    @PostMapping
    public ResponseEntity<BaseResponse<WithdrawalViewDTO>> create(@Valid @RequestBody WithdrawalCreateDTO dto) {
        var result = withdrawalService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(new BaseResponse<>(result));
    }

    @GetMapping("/my")
    public ResponseEntity<PageResponse<WithdrawalViewDTO>> getMyWithdrawals(@ParameterObject Pageable pageable) {
        var page = withdrawalService.getMyWithdrawals(pageable);
        return ResponseEntity.status(HttpStatus.OK).body(new PageResponse<>(page));
    }

    @Tag(name = "Admin")
    @GetMapping("/admin/search")
    @PreAuthorize("hasAnyRole('ADMIN','ACCOUNTING')")
    public ResponseEntity<PageResponse<WithdrawalViewDTO>> searchAdmin(@RequestParam(required = false) WithdrawalStatus status,
                                                                       @RequestParam(required = false) String username,
                                                                       Pageable pageable) {

        var page = withdrawalService.getAll(pageable);
        return ResponseEntity.status(HttpStatus.OK).body(new PageResponse<>(page));
    }

    @Tag(name = "Admin")
    @PutMapping("/admin/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','ACCOUNTING')")
    public ResponseEntity<BaseResponse<Void>> updateStatus(@PathVariable UUID id,
                                                           @Valid @RequestBody WithdrawalAdminUpdateDTO dto) {
        withdrawalService.updateStatus(id, dto);
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse<>(true));
    }
    @GetMapping("/admin/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','ACCOUNTING')")
    public ResponseEntity<BaseResponse<WithdrawalViewDTO>> getOneAdmin(
            @PathVariable UUID id
    ) {
        var result = withdrawalService.getOneAdmin(id);
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse<>(result));
    }

}
