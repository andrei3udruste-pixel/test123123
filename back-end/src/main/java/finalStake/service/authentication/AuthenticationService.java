package finalStake.service.authentication;

import finalStake.dto.user.UserEmailDTO;
import finalStake.dto.user.UserNewPasswordDTO;
import finalStake.dto.user.UserSignInDTO;
import finalStake.dto.user.UserSignUpDTO;

import java.util.UUID;

public interface AuthenticationService {
    String signIn(UserSignInDTO userSignInDTO);

    String signInAdmin(UserSignInDTO userSignInDTO);

    void signUp(UserSignUpDTO userSignUpDTO);

    void confirmEmail(UUID token);

    void sendConfirmEmail(UserEmailDTO emailDTO);

    void resetPassword(UUID token, UserNewPasswordDTO newPasswordDTO);

    void sendResetPassword(UserEmailDTO emailDTO);
}