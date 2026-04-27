import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NotificationsModel } from '../../models/notifications-model';
import { environment } from '../../../environments/environment';
import { API_ENDPOINTS } from '../../config/constants';

const NOTIFICATIONS_API = `${environment.apiUrl}${API_ENDPOINTS.NOTIFICATIONS}/`;

@Injectable({
  providedIn: 'root',
})
export class NotificationsServices {
  private _HTTP = inject(HttpClient);

  GetAll(): Observable<NotificationsModel[]> {
    return new Observable((obs) => {
      this._HTTP.get<NotificationsModel[]>(NOTIFICATIONS_API).subscribe({
        next: (data: NotificationsModel[]) => {
          obs.next(data);
          obs.complete();
        },
        error: (err: any) => {
          console.log('Erreur lors du chargement de la recup de toutes les notifs');
        },
      });
    });
  }
}
