import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutStateService {
  _isSidenavOpen = signal<boolean>(false);

  get isSidenavOpen(): boolean {
    return this._isSidenavOpen();
  }

  set isSidenavOpen(isSidenavOpen: boolean) {
    this._isSidenavOpen.set(isSidenavOpen);
  }

  toggleSidenavOpen(): void {
    this._isSidenavOpen.set(!this._isSidenavOpen());
  }
}
