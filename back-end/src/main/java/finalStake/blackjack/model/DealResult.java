package finalStake.blackjack.model;

public class DealResult {
    private String playerHand;
    private String dealerHand;
    private int playerScore;
    private int dealerScore;
    private double winAmount;
    private boolean isWin;
    private String message;
    private String status = "ongoing";
    private boolean playerTurn = true;

    public DealResult() {}

    public String getPlayerHand() { return playerHand; }
    public void setPlayerHand(String playerHand) { this.playerHand = playerHand; }

    public String getDealerHand() { return dealerHand; }
    public void setDealerHand(String dealerHand) { this.dealerHand = dealerHand; }

    public int getPlayerScore() { return playerScore; }
    public void setPlayerScore(int playerScore) { this.playerScore = playerScore; }

    public int getDealerScore() { return dealerScore; }
    public void setDealerScore(int dealerScore) { this.dealerScore = dealerScore; }

    public double getWinAmount() { return winAmount; }
    public void setWinAmount(double winAmount) { this.winAmount = winAmount; }

    public boolean isWin() { return isWin; }
    public void setIsWin(boolean isWin) { this.isWin = isWin; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public boolean isPlayerTurn() { return playerTurn; }
    public void setPlayerTurn(boolean playerTurn) { this.playerTurn = playerTurn; }
}