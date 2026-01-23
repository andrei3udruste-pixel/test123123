import {Component, inject} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {LanguageSelector} from '../../../shared/components/language-selector/language-selector';
import {RouterLink} from '@angular/router';
import {LayoutStateService} from '../../../shared/services/layout-state/layout-state';
import {TranslatePipe} from '@ngx-translate/core';
import { WalletDataService } from '../../../shared/services/wallet/wallet';
import { WalletViewDTO } from '../../../shared/services/wallet/wallet-api.service';
import {UserDataService} from '../../../shared/services/user/user';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbar,
    MatIconButton,
    MatIconModule,
    LanguageSelector,
    RouterLink,
    CommonModule,
    TranslatePipe
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  standalone: true
})
export class Navbar {
  private userData = inject(UserDataService);
  private walletData = inject(WalletDataService);

  layoutState = inject(LayoutStateService);
  user = this.userData.signal;
  wallet = this.walletData.signal;
}
