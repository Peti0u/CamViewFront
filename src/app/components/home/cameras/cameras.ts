import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { API_ENDPOINTS } from '../../../config/constants';

interface Camera {
  camera_id: number;
  family_id: number;
  camera_name: string;
  adr_ip: string;
  lien_http: string;
  notif_state: number;
}

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './cameras.html',
  styleUrl: './cameras.scss',
})
export class Cameras implements OnInit {
  cameras: Camera[] = [];
  id_circle = 0;
  circle_number: number[] = [];

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.loadCameras();
  }

  loadCameras() {
    const apiUrl = `${environment.apiUrl}${API_ENDPOINTS.CAMERAS}`;
    this.http.get<Camera[]>(apiUrl).subscribe({
      next: (data) => {
        this.cameras = data;
        this.circle_number = Array.from(
          { length: Math.ceil(this.cameras.length / 2) },
          (_, i) => i + 1
        );
      },
      error: (err) => {
        console.error('Erreur lors du chargement des caméras :', err);
      },
    });
  }

  getSafeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
