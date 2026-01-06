import {Component, inject} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {LanguageSelector} from '../../../shared/components/language-selector/language-selector';
import {RouterLink} from '@angular/router';
import {LayoutStateService} from '../../../shared/services/layout-state/layout-state';

@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbar,
    MatIconButton,
    MatIconModule,
    LanguageSelector,
    RouterLink
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  layoutState = inject(LayoutStateService);
}
