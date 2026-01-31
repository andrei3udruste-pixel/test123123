package finalStake.blackjack.repository;

import finalStake.blackjack.model.BlackjackGame;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlackjackGameRepository extends JpaRepository<BlackjackGame, Long> {
}