import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificationsModel } from '../../models/notifications-model';
import { environment } from '../../../environments/environment';
import { API_ENDPOINTS } from '../../config/constants';
import { AuthService } from '../auth.service';

const NOTIFICATIONS_API = `${environment.apiUrl}${API_ENDPOINTS.NOTIFICATIONS}/`;

@Injectable({
  providedIn: 'root',
})
export class NotificationsServices {
  private _HTTP = inject(HttpClient);
  private _AUTH = inject(AuthService);

  GetAll(): Observable<NotificationsModel[]> {
    const token = this._AUTH.getToken();
    const headers = new HttpHeaders().set('x-access-token', token || '');
    return this._HTTP.get<NotificationsModel[]>(NOTIFICATIONS_API, { headers });
  }
}
