import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NotificationsModel } from '../../models/notifications-model';

@Injectable({
  providedIn: 'root',
})
export class NotificationsServices {
  private _HTTP = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8080/api/notifications';

  GetAll(): Observable<NotificationsModel[]> {
    return new Observable((obs) => {
      this._HTTP.get<NotificationsModel[]>(`${this.API_URL}/`).subscribe({
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
