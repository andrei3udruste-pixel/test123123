import {Component, inject, input} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {Location} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-back-button',
  imports: [
    MatIcon,
    MatButton,
    TranslatePipe,
    MatIconButton
  ],
  templateUrl: './back-button.html',
  styleUrl: './back-button.scss',
})
export class BackButton {
  iconOnly = input(true);

  private location = inject(Location);

  navigateBack(): void {
    this.location.back();
  }
}
