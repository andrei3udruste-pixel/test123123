package finalStake.config;

import finalStake.model.entity.Currency;
import finalStake.repository.CurrencyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Slf4j
@Component
@Order(1)
@RequiredArgsConstructor
public class CurrencyInitializer implements CommandLineRunner {

    private final CurrencyRepository currencyRepository;

    @Override
    public void run(String... args) {
        createCurrencyIfNotExists("RON", "Romanian Leu", new BigDecimal("1.0"), new BigDecimal("0.95"));
        createCurrencyIfNotExists("EUR", "Euro", new BigDecimal("5.0"), new BigDecimal("4.75"));
        createCurrencyIfNotExists("GBP", "British Pound", new BigDecimal("5.85"), new BigDecimal("5.55"));
    }

    private void createCurrencyIfNotExists(String code, String name, BigDecimal buyingConversion, BigDecimal sellingConversion) {
        if (currencyRepository.findByCode(code).isEmpty()) {
            Currency currency = Currency.builder()
                    .code(code)
                    .name(name)
                    .buyingConversion(buyingConversion)
                    .sellingConversion(sellingConversion)
                    .build();
            currencyRepository.save(currency);
            log.info("Created currency: {} with buying rate: {} Stakes, selling rate: {} Stakes", code, buyingConversion, sellingConversion);
        }
    }
}
