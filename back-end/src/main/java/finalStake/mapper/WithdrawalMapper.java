package finalStake.mapper;

import finalStake.dto.withdrawal.WithdrawalViewDTO;
import finalStake.model.entity.Withdrawal;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface WithdrawalMapper {

    WithdrawalViewDTO toViewDto(Withdrawal withdrawal);
}
