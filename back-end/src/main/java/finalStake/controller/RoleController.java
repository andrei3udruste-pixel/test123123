package finalStake.controller;

import finalStake.response.BaseResponse;
import finalStake.service.role.RoleService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Tag(name = "Role")
@RequiredArgsConstructor
@RequestMapping("/api/role/")
@SecurityRequirement(name = "Authentication")
public class RoleController {
    private final RoleService roleService;

    @GetMapping("/all")
    public ResponseEntity<BaseResponse<List<String>>> getAllRoles() {
        var roles = roleService.getAllRoles();
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse<>(roles));
    }
}
