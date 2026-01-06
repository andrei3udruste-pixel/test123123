import {Component} from '@angular/core';
import {MatCard, MatCardTitle} from "@angular/material/card";
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-change-password-page',
  imports: [
    MatCard,
    FormsModule,
    MatCardTitle
  ],
  templateUrl: './change-password-page.html',
  styleUrl: './change-password-page.scss',
})
export class ChangePasswordPage {

}
