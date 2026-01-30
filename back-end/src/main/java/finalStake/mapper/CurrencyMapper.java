package finalStake.mapper;

import finalStake.dto.currency.CurrencyViewDTO;
import finalStake.model.entity.Currency;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CurrencyMapper {
    CurrencyViewDTO currencyToViewDTO(Currency currency);
}
