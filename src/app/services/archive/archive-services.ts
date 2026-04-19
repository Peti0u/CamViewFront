import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArchiveServices {
  private _HTTP = inject(HttpClient);
  private readonly API_URL = 'http://localhost:3000/api/companies';
}
