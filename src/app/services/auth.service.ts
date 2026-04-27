import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { API_ENDPOINTS, STORAGE_KEYS } from '../config/constants';

const AUTH_API = `${environment.apiUrl}${API_ENDPOINTS.AUTH}/`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = signal<boolean>(!!this.getToken());

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  login(credentials: any): Observable<any> {
    return this.http.post(AUTH_API + 'login', credentials).pipe(
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
    window.localStorage.clear();
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(STORAGE_KEYS.TOKEN);
    window.localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  }

  public getToken(): string | null {
    return window.localStorage.getItem(STORAGE_KEYS.TOKEN);
  }
}
