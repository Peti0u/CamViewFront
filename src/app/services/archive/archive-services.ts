import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArchiveModel } from '../../models/archive-model';
import { environment } from '../../../environments/environment';
import { API_ENDPOINTS } from '../../config/constants';
import { AuthService } from '../auth.service';

const ARCHIVE_API = `${environment.apiUrl}${API_ENDPOINTS.ARCHIVE}/`;

@Injectable({
  providedIn: 'root',
})
export class ArchiveServices {
  private _HTTP = inject(HttpClient);
  private _AUTH = inject(AuthService);

  private getHeaders(): { headers: HttpHeaders } {
    const token = this._AUTH.getToken();
    return { headers: new HttpHeaders().set('x-access-token', token || '') };
  }

  GetAll(): Observable<ArchiveModel[]> {
    return this._HTTP.get<ArchiveModel[]>(ARCHIVE_API, this.getHeaders());
  }

  GetAllImages(): Observable<ArchiveModel[]> {
    return this._HTTP.get<ArchiveModel[]>(ARCHIVE_API + 'images', this.getHeaders());
  }

  GetAllVideos(): Observable<ArchiveModel[]> {
    return this._HTTP.get<ArchiveModel[]>(ARCHIVE_API + 'videos', this.getHeaders());
  }

  // Nouvelles méthodes Explorer
  ListFiles(path: string = ''): Observable<any[]> {
    return this._HTTP.get<any[]>(
      `${environment.apiUrl}/family/storage/list?path=${path}`,
      this.getHeaders(),
    );
  }

  CreateFolder(folderName: string, currentPath: string): Observable<any> {
    return this._HTTP.post(
      `${environment.apiUrl}/family/storage/mkdir`,
      { folderName, currentPath },
      this.getHeaders(),
    );
  }

  RenameItem(itemPath: string, newName: string): Observable<any> {
    return this._HTTP.put(
      `${environment.apiUrl}/family/storage/rename`,
      { itemPath, newName },
      this.getHeaders(),
    );
  }

  MoveItem(sourcePath: string, destinationPath: string): Observable<any> {
    return this._HTTP.put(
      `${environment.apiUrl}/family/storage/move`,
      { sourcePath, destinationPath },
      this.getHeaders(),
    );
  }

  DeleteItem(itemPath: string): Observable<any> {
    return this._HTTP.delete(
      `${environment.apiUrl}/family/storage/delete?path=${itemPath}`,
      this.getHeaders(),
    );
  }
}
