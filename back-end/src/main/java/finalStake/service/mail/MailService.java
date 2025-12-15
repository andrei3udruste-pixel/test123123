package finalStake.service.mail;

import org.thymeleaf.context.Context;

public interface MailService {
    void sendEmail(String to, String subject, String template, Context context);
}
