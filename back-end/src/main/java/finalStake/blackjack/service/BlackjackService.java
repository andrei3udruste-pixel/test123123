package finalStake.blackjack.service;

import finalStake.blackjack.model.DealResult;

public interface BlackjackService {
    DealResult deal(double bet);
}