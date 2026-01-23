package finalStake.mapper;

import finalStake.dto.withdrawal.WithdrawalViewDTO;
import finalStake.model.entity.Withdrawal;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface WithdrawalMapper {

    @Mapping(source = "user.username", target = "username")
    WithdrawalViewDTO toViewDto(Withdrawal withdrawal);
}
