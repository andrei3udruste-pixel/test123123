package finalStake.controller;

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

import finalStake.dto.user.*;
import finalStake.response.BaseResponse;
import finalStake.response.PageResponse;
import finalStake.service.user.UserService;

import java.util.List;
import java.util.UUID;

@RestController
@Tag(name = "User")
@RequiredArgsConstructor
@RequestMapping("/api/user")
@SecurityRequirement(name = "Authentication")
public class UserController {
    private final UserService userService;

    @Tag(name = "Admin")
    @GetMapping("/admin/search")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<PageResponse<UserViewAdminDTO>> searchAdmin(@ParameterObject Pageable pageable, @Valid UserSearchAdminDTO searchDTO) {
        var page = userService.getSearchPageAdmin(pageable, searchDTO);
        return ResponseEntity.status(HttpStatus.OK).body(new PageResponse<>(page));
    }

    @GetMapping("/search")
    public ResponseEntity<BaseResponse<List<UserListViewDTO>>> search(@Valid UserSearchDTO searchDTO) {
        var searchResults = userService.getSearchList(searchDTO);
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse<>(searchResults));
    }

    @GetMapping("/profile")
    public ResponseEntity<BaseResponse<UserViewDTO>> getProfileCurrent() {
        var userView = userService.getView();
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse<>(userView));
    }

    @PutMapping("/profile")
    public ResponseEntity<BaseResponse<Void>> updateProfile(@Valid @RequestBody UserUpdateDTO updateDTO) {
        userService.updateUser(updateDTO);
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse<>(true));
    }

    @GetMapping("/profile/{id}")
    public ResponseEntity<BaseResponse<UserViewDTO>> getProfile(@PathVariable UUID id) {
        var userView = userService.getView(id);
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse<>(userView));
    }

    @GetMapping("/admin/profile/{id}")
    public ResponseEntity<BaseResponse<UserViewAdminDTO>> getProfileAdmin(@PathVariable UUID id) {
        var userView = userService.getViewAdmin(id);
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse<>(userView));
    }

    @Tag(name = "Admin")
    @PutMapping("/admin/{id}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<BaseResponse<Void>> updateUserAdmin(@PathVariable UUID id, @Valid @RequestBody UserUpdateAdminDTO updateDTO) {
        userService.updateUserAdmin(id, updateDTO);
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse<>(true));
    }

    @DeleteMapping("/profile")
    public ResponseEntity<BaseResponse<Void>> deleteProfileCurrent() {
        userService.deleteUser();
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse<>(true));
    }

    @Tag(name = "Admin")
    @DeleteMapping("/admin/{id}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<BaseResponse<Void>> deleteProfile(@PathVariable UUID id) {
        userService.deleteUser(id);
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse<>(true));
    }
}
