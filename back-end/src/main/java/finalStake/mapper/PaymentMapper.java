package finalStake.mapper;

import finalStake.dto.payment.PaymentViewDTO;
import finalStake.model.entity.Payment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface PaymentMapper {

    @Mapping(source = "user.username", target = "username")
    @Mapping(source = "currency.code", target = "currencyCode")
    PaymentViewDTO toViewDto(Payment payment);
}
