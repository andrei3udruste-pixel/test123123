package finalStake.service.currency;

import finalStake.dto.currency.CurrencyUpdateDTO;
import finalStake.dto.currency.CurrencyViewDTO;

import java.util.List;

public interface CurrencyService {
    List<CurrencyViewDTO> findAll();
    CurrencyViewDTO findById(Long id);
    CurrencyViewDTO update(Long id, CurrencyUpdateDTO dto);
}
