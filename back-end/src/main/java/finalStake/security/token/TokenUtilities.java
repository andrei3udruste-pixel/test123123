package finalStake.security.token;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;

import java.util.Date;

import finalStake.exception.authentication.JwtExpiredException;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import static finalStake.security.token.AuthenticationTokenFilter.HEADER_PREFIX;

@Slf4j
@Component
public class TokenUtilities {
    @Value("${spring.application.name}")
    private String applicationName;

    @Value("${com.finalStake.token.secret}")
    private String tokenSecret;

    @Value("${com.finalStake.token.expirationTimeMs}")
    private Long tokenExpirationMs;

    public String generateToken(UserDetails userDetails) {
        var issuedDate = new Date();
        var expirationDate = new Date(issuedDate.getTime() + tokenExpirationMs);
        var algorithm = getAlgorithm();

        return JWT.create()
                .withSubject(userDetails.getUsername())
                .withIssuedAt(issuedDate)
                .withExpiresAt(expirationDate)
                .withIssuer(applicationName)
                .sign(algorithm);
    }
    public String getUsernameFromToken(String token) {
        if (token.startsWith(HEADER_PREFIX)) {
            token = token.substring(HEADER_PREFIX.length());
        }

        var decodedToken = decodeToken(token);

        if (decodedToken != null) {
            return decodedToken.getSubject();
        }
        return null;
    }

    private Algorithm getAlgorithm() {
        return Algorithm.HMAC512(tokenSecret);
    }

    private DecodedJWT decodeToken(String token) {
        try {
            var algorithm = getAlgorithm();
            var verifier = JWT.require(algorithm).withIssuer(applicationName).build();
            return verifier.verify(token);
        } catch (TokenExpiredException exception) {
            log.error("JWT token expired: {}", exception.getMessage());
            throw new JwtExpiredException("JWT token has expired", exception);
        } catch (JWTVerificationException exception) {
            log.error("JWT verification failed: {}", exception.getMessage());
            throw new JwtExpiredException("Invalid JWT token", exception);
        }
    }
}
