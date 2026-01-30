package finalStake.service.mail;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;

@Slf4j
@Service
@Profile("local")
@RequiredArgsConstructor
public class NoopMailServiceImpl implements MailService {

    @Async
    @Override
    public void sendEmail(String to, String subject, String template, Context context) {
        // Nu trimite email in local, doar log
        log.info("[LOCAL] Email suppressed. to={}, subject={}, template={}", to, subject, template);
    }
}