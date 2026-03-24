import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

const AUTH_API = 'http://localhost:8080/api/auth/';
const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Utilisation d'un signal pour un état d'authentification réactif.
  isLoggedIn = signal<boolean>(!!this.getToken());

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  login(credentials: any): Observable<any> {
    return this.http.post(AUTH_API + 'signin', credentials).pipe(
      tap((response: any) => {
        this.saveToken(response.accessToken);
        this.isLoggedIn.set(true);
      }),
    );
  }

  register(user: any): Observable<any> {
    return this.http.post(AUTH_API + 'signup', user);
  }

  logout(): void {
    window.localStorage.removeItem(TOKEN_KEY);
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }
}
