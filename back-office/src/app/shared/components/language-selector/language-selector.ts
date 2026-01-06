import {Component, inject} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {LanguageService} from '../../services/language/language';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-language-selector',
  imports: [
    TranslatePipe,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './language-selector.html',
  styleUrl: './language-selector.scss',
})
export class LanguageSelector {
  public language = inject(LanguageService);

  public readonly emojiMapping: Record<string, string> = {
    "en": "\uD83C\uDDEC\uD83C\uDDE7",
    "ro": "\uD83C\uDDF7\uD83C\uDDF4"
  }

  selectLanguage(selectedLanguage: string): void {
    this.language.selectedLanguage = selectedLanguage;
  }
}
