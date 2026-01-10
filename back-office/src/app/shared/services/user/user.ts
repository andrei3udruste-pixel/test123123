import {inject, Injectable, Injector, signal} from '@angular/core';
import {UserService, UserViewDTO} from '../../../openapi';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  injector = inject(Injector);

  _user = signal<UserViewDTO | null>(null);
  _token = signal<string | null>(this.getTokenLocalStorage());

  get token(): string | null {
    return this._token();
  }

  set token(token: string | null) {
    if (token) {
      this._token.set(token);
      this.setTokenLocalStorage(token);
      this.loadCurrentUser();
    } else {
      this._token.set(null);
      this._user.set(null);
      localStorage.removeItem('token');
    }
  }

  get isAuthenticated(): boolean {
    return this._token() !== null;
  }

  get data(): UserViewDTO | null {
    return this._user();
  }

  hasAnyAuthority(roles: string[]): boolean {
    if (this._user() && this._user()?.roles) {
      for (const role of this._user()!.roles!) {
        if (roles.includes(role)) {
          return true;
        }
      }
    }
    return false;
  }

  loadCurrentUser(): void {
    const userService = this.injector.get(UserService);
    userService.getProfileCurrent()
      .subscribe((userResponse) => {
        this._user.set(userResponse.data ? userResponse.data : null);
      });
  }

  private getTokenLocalStorage(): string | null {
    return localStorage.getItem('token');
  }

  private setTokenLocalStorage(token: string): void {
    localStorage.setItem('token', token);
  }
}
