package finalStake.service.currency;

import finalStake.dto.currency.CurrencyUpdateDTO;
import finalStake.dto.currency.CurrencyViewDTO;
import finalStake.exception.global.ResourceNotFoundException;
import finalStake.mapper.CurrencyMapper;
import finalStake.model.entity.Currency;
import finalStake.repository.CurrencyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CurrencyServiceImpl implements CurrencyService {

    private final CurrencyRepository currencyRepository;
    private final CurrencyMapper currencyMapper;

    @Override
    public List<CurrencyViewDTO> findAll() {
        return currencyRepository.findAllByOrderByCodeAsc()
                .stream()
                .map(currencyMapper::currencyToViewDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CurrencyViewDTO findById(Long id) {
        Currency currency = currencyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Currency not found with id: " + id));
        return currencyMapper.currencyToViewDTO(currency);
    }

    @Override
    @Transactional
    public CurrencyViewDTO update(Long id, CurrencyUpdateDTO dto) {
        Currency currency = currencyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Currency not found with id: " + id));

        // Validate: buying rate must be greater than selling rate
        if (dto.getBuyingConversion().compareTo(dto.getSellingConversion()) <= 0) {
            throw new IllegalArgumentException("Buying conversion rate must be greater than selling conversion rate");
        }

        currency.setBuyingConversion(dto.getBuyingConversion());
        currency.setSellingConversion(dto.getSellingConversion());
        Currency updated = currencyRepository.save(currency);

        return currencyMapper.currencyToViewDTO(updated);
    }
}
