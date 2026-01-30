package finalStake.service.mail;

import com.azure.communication.email.EmailClient;
import com.azure.communication.email.EmailClientBuilder;
import com.azure.communication.email.models.EmailMessage;
import com.azure.communication.email.models.EmailSendResult;
import com.azure.core.util.polling.PollResponse;
import com.azure.core.util.polling.SyncPoller;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.ResourceBundle;

@Slf4j
@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService {
    private final TemplateEngine templateEngine;

    @Value("${azure.communication.connection-string}")
    private String connectionString;

    @Value("${azure.communication.sender-address}")
    private String senderAddress;

    private EmailClient emailClient;

    @PostConstruct
    public void init() {
        emailClient = new EmailClientBuilder()
                .connectionString(connectionString)
                .buildClient();
    }

    @Async
    @Override
    public void sendEmail(String to, String subject, String template, Context context) {
        try {
            var locale = LocaleContextHolder.getLocale();
            var bundle = ResourceBundle.getBundle("messages", locale);

            var templatePath = "mail/" + locale.getLanguage() + "/" + template;
            var translatedSubject = bundle.getString("mail." + subject);

            log.info("Attempting to send email template {} to {}", templatePath, to);

            String htmlContent = templateEngine.process(templatePath, context);

            EmailMessage emailMessage = new EmailMessage()
                    .setSenderAddress(senderAddress)
                    .setToRecipients(to)
                    .setSubject(translatedSubject)
                    .setBodyHtml(htmlContent);

            SyncPoller<EmailSendResult, EmailSendResult> poller = emailClient.beginSend(emailMessage);
            PollResponse<EmailSendResult> response = poller.waitForCompletion();

            log.info("Successfully sent email template {} to {}, status: {}", templatePath, to, response.getStatus());
        } catch (Exception exception) {
            log.error("Could not send email!", exception);
            throw new RuntimeException(exception);
        }
    }
}
