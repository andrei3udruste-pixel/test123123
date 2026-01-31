package finalStake.blackjack.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "blackjack_games")
public class BlackjackGame {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String userId;

    @Column(precision = 19, scale = 2, nullable = false)
    private BigDecimal bet;

    @ElementCollection
    @CollectionTable(name = "player_hand", joinColumns = @JoinColumn(name = "game_id"))
    private List<Card> playerHand = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "dealer_hand", joinColumns = @JoinColumn(name = "game_id"))
    private List<Card> dealerHand = new ArrayList<>();

    private int playerScore;
    private int dealerScore;

    @Column(nullable = false)
    private String status = "ongoing";

    private String result;

    @Column(precision = 19, scale = 2)
    private BigDecimal payout = BigDecimal.ZERO;

    private boolean playerTurn = true;

    private LocalDateTime createdAt = LocalDateTime.now();

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public BigDecimal getBet() { return bet; }
    public void setBet(BigDecimal bet) { this.bet = bet; }

    public List<Card> getPlayerHand() { return playerHand; }
    public void setPlayerHand(List<Card> playerHand) { this.playerHand = playerHand; }

    public List<Card> getDealerHand() { return dealerHand; }
    public void setDealerHand(List<Card> dealerHand) { this.dealerHand = dealerHand; }

    public int getPlayerScore() { return playerScore; }
    public void setPlayerScore(int playerScore) { this.playerScore = playerScore; }

    public int getDealerScore() { return dealerScore; }
    public void setDealerScore(int dealerScore) { this.dealerScore = dealerScore; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getResult() { return result; }
    public void setResult(String result) { this.result = result; }

    public BigDecimal getPayout() { return payout; }
    public void setPayout(BigDecimal payout) { this.payout = payout; }

    public boolean isPlayerTurn() { return playerTurn; }
    public void setPlayerTurn(boolean playerTurn) { this.playerTurn = playerTurn; }

    public LocalDateTime getCreatedAt() { return createdAt; }
}