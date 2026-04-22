import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ArchiveModel } from '../../models/archive-model';

@Injectable({
  providedIn: 'root',
})
export class ArchiveServices {
  private _HTTP = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8080/api/archive';

  GetAll(): Observable<ArchiveModel[]> {
    return new Observable((obs) => {
      this._HTTP.get<ArchiveModel[]>(`${this.API_URL}/`).subscribe({
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
      this._HTTP.get<ArchiveModel[]>(`${this.API_URL}/images`).subscribe({
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
      this._HTTP.get<ArchiveModel[]>(`${this.API_URL}/videos`).subscribe({
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
