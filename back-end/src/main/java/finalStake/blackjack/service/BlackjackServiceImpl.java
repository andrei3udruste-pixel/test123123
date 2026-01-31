package finalStake.blackjack.service;

import finalStake.model.entity.User;
import finalStake.model.entity.Wallet;
import finalStake.repository.UserRepository;
import finalStake.repository.WalletRepository;
import finalStake.blackjack.model.DealResult;
import finalStake.blackjack.model.Card;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class BlackjackServiceImpl implements BlackjackService {

    private final WalletRepository walletRepository;
    private final UserRepository userRepository;

    private static final String[] SUITS = {"hearts", "diamonds", "clubs", "spades"};
    private static final String[] RANKS = {"2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"};

    @Override
@Transactional
public DealResult deal(double bet) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String username = authentication.getName();

    User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new IllegalStateException("User not found"));

    Wallet wallet = walletRepository.findByUser(user)
            .orElseThrow(() -> new IllegalStateException("Wallet not found"));

    BigDecimal betAmount = BigDecimal.valueOf(bet);

    if (betAmount.compareTo(BigDecimal.ZERO) <= 0) {
        throw new IllegalArgumentException("Bet must be positive");
    }
    if (wallet.getBalance().compareTo(betAmount) < 0) {
        throw new IllegalStateException("Insufficient balance");
    }

    wallet.setBalance(wallet.getBalance().subtract(betAmount));
    walletRepository.save(wallet);

    List<Card> deck = createShuffledDeck();

    List<Card> playerHand = new ArrayList<>();
    playerHand.add(deck.remove(0));
    playerHand.add(deck.remove(0));

    List<Card> dealerHand = new ArrayList<>();
    dealerHand.add(deck.remove(0));
    Card hidden = deck.remove(0);
    hidden.setHidden(true);
    dealerHand.add(hidden);

    int playerScore = calculateScore(playerHand);
    int dealerVisibleScore = calculateVisibleScore(dealerHand);

    DealResult result = new DealResult();
    result.setPlayerHand(formatHand(playerHand));
    result.setDealerHand(formatHand(dealerHand));
    result.setPlayerScore(playerScore);
    result.setDealerScore(dealerVisibleScore);
    result.setStatus("ongoing");
    result.setPlayerTurn(true);
    result.setWinAmount(0);
    result.setIsWin(false);
    result.setMessage("Alege: Hit sau Stand");

    return result;
}

private List<Card> createShuffledDeck() {
    List<Card> deck = new ArrayList<>();
    for (String suit : SUITS) {
        for (String rank : RANKS) {
            deck.add(new Card(suit, rank));
        }
    }
    Collections.shuffle(deck);
    return deck;
}

private int calculateScore(List<Card> hand) {
    int score = 0;
    int aces = 0;
    for (Card c : hand) {
        if ("A".equals(c.getRank())) {
            aces++;
            score += 11;
        } else if ("J".equals(c.getRank()) || "Q".equals(c.getRank()) || "K".equals(c.getRank())) {
            score += 10;
        } else {
            score += Integer.parseInt(c.getRank());
        }
    }
    while (score > 21 && aces > 0) {
        score -= 10;
        aces--;
    }
    return score;
}

private int calculateVisibleScore(List<Card> hand) {
    int score = 0;
    for (Card c : hand) {
        if (!c.isHidden()) {
            if ("A".equals(c.getRank())) score += 11;
            else if ("J".equals(c.getRank()) || "Q".equals(c.getRank()) || "K".equals(c.getRank())) score += 10;
            else score += Integer.parseInt(c.getRank());
        }
    }
    return score;
}

private String formatHand(List<Card> hand) {
    StringBuilder sb = new StringBuilder();
    for (Card c : hand) {
        sb.append(c.getRank()).append(" of ").append(c.getSuit());
        if (c.isHidden()) sb.append(" (hidden)");
        sb.append(", ");
    }
    return sb.toString().replaceAll(", $", "");
}
}