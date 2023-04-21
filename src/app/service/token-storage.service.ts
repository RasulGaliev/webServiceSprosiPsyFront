import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const PSY_KEY = 'auth-psy';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() {
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): any {
    console.log(sessionStorage.getItem(TOKEN_KEY));
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(psy: any): void {
    console.log(psy);
    window.sessionStorage.removeItem(PSY_KEY);
    window.sessionStorage.setItem(PSY_KEY, JSON.stringify(psy));
  }

  public getUser(): any{
    const item = sessionStorage.getItem(PSY_KEY);
    if (item) {
      console.log(JSON.parse(item));
      return JSON.parse(item);
    }
  }

  logOut(): void {
    window.sessionStorage.clear();
    window.location.reload();
  }
}
