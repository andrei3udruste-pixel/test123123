package finalStake.exception.authentication;

import org.springframework.security.core.AuthenticationException;

public class JwtExpiredException extends AuthenticationException {
    public JwtExpiredException(String message) {
        super(message);
    }

    public JwtExpiredException(String message, Throwable cause) {
        super(message, cause);
    }
}
