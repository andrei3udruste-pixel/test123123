import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlackjackService } from './services/blackjack.service';

@Component({
  selector: 'app-blackjack',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blackjack.component.html',
  styleUrls: ['./blackjack.component.scss']
})
export class BlackjackComponent {
  bet: number = 10;
  playerHand: string = 'A of hearts, 10 of spades';
  dealerHand: string = '7 of clubs, ?';
  winAmount: number = 0;
  message: string = 'Pregătit?';
  isPlaying: boolean = false;

  constructor(private blackjackService: BlackjackService) {}

  onDeal() {
    if (this.isPlaying) return;

    const betValue = Number(this.bet);
    if (betValue <= 0) {
      this.message = 'Miză invalidă (> 0).';
      return;
    }

    this.isPlaying = true;
    this.message = 'Se joacă...';
    this.winAmount = 0;

    this.blackjackService.deal(betValue).subscribe({
      next: (result) => {
        this.playerHand = result.playerHand;
        this.dealerHand = result.dealerHand;
        this.winAmount = result.winAmount;
        this.isPlaying = false;

        if (result.isWin) {
          this.message = `AI CÂȘTIGAT ${result.winAmount} RON!`;
        } else {
          this.message = 'Ai pierdut. Mai încearcă!';
        }
      },
      error: (err) => {
        console.error(err);
        this.isPlaying = false;
        this.message = 'Eroare server.';
      }
    });
  }
}