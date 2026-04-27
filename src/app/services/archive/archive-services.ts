import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ArchiveModel } from '../../models/archive-model';
import { environment } from '../../../environments/environment';
import { API_ENDPOINTS } from '../../config/constants';

const ARCHIVE_API = `${environment.apiUrl}${API_ENDPOINTS.ARCHIVE}/`;

@Injectable({
  providedIn: 'root',
})
export class ArchiveServices {
  private _HTTP = inject(HttpClient);

  GetAll(): Observable<ArchiveModel[]> {
    return new Observable((obs) => {
      this._HTTP.get<ArchiveModel[]>(ARCHIVE_API).subscribe({
        next: (data: ArchiveModel[]) => {
          obs.next(data);
          obs.complete();
        },
        error: (err: any) => {
          console.log('Erreur lors du chargement de la recup de toutes les archives');
        },
      });
    });
  }

  GetAllImages(): Observable<ArchiveModel[]> {
    return new Observable((obs) => {
      this._HTTP.get<ArchiveModel[]>(ARCHIVE_API + 'images').subscribe({
        next: (data: ArchiveModel[]) => {
          obs.next(data);
          obs.complete();
        },
        error: (err: any) => {
          console.log('Erreur lors du chargement de la recup de toutes les images archivees');
        },
      });
    });
  }

  GetAllVideos(): Observable<ArchiveModel[]> {
    return new Observable((obs) => {
      this._HTTP.get<ArchiveModel[]>(ARCHIVE_API + 'videos').subscribe({
        next: (data: ArchiveModel[]) => {
          obs.next(data);
          obs.complete();
        },
        error: (err: any) => {
          console.log('Erreur lors du chargement de la recup de toutes les videos archivees');
        },
      });
    });
  }
}
