import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth.service';
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
  selector: 'app-cameras',
  standalone: false,
  templateUrl: './cameras.html',
  styleUrl: './cameras.scss',
})
export class Cameras implements OnInit, OnDestroy {
  // Placeholders pour que les boutons et cartes soient visibles immédiatement
  cameras: Camera[] = [
    {
      camera_id: 1,
      family_id: 1,
      camera_name: 'Caméra Salon (Place-holder)',
      adr_ip: '',
      lien_http: '/exemple_cam.png',
      notif_state: 0,
    },
    {
      camera_id: 2,
      family_id: 1,
      camera_name: 'Caméra Entrée (Place-holder)',
      adr_ip: '',
      lien_http: '/exemple_cam2.png',
      notif_state: 0,
    },
  ];
  id_circle = 0;
  circle_number: number[] = [];
  user = signal<any>(null);
  message = signal<string | null>(null);
  messageType = signal<'success' | 'error' | null>(null);

  // Gestion du cycle de rafraîchissement
  private refreshInterval: any;
  failedCameraIds = signal<Set<number>>(new Set());
  currentTimestamp = signal<number>(Date.now());
  fullscreenCameraId = signal<number | null>(null);

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private auth: AuthService,
  ) {}

  ngOnInit() {
    this.loadProfile();
    this.loadCameras();

    // Réessayer les caméras toutes les 15 secondes
    this.refreshInterval = setInterval(() => {
      this.currentTimestamp.set(Date.now());
      this.failedCameraIds.set(new Set());
    }, 15000);
  }

  ngOnDestroy() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  loadProfile() {
    const token = this.auth.getToken();
    const headers = new HttpHeaders().set('x-access-token', token || '');
    this.http.get(`${environment.apiUrl}/user/me`, { headers }).subscribe({
      next: (data) => this.user.set(data),
      error: () => this.auth.logout(),
    });
  }

  private showMessage(msg: string, type: 'success' | 'error') {
    this.message.set(msg);
    this.messageType.set(type);
    setTimeout(() => {
      this.message.set(null);
      this.messageType.set(null);
    }, 5000);
  }

  loadCameras() {
    const token = this.auth.getToken();
    const headers = new HttpHeaders().set('x-access-token', token || '');
    const apiUrl = `${environment.apiUrl}${API_ENDPOINTS.CAMERAS}`;
    this.http.get<Camera[]>(apiUrl, { headers }).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.cameras = data;
        } else {
          this.setDefaultPlaceholders();
        }
        this.updateCirclePagination();
      },
      error: (err) => {
        console.error('Erreur lors du chargement des caméras :', err);
        this.setDefaultPlaceholders();
        this.updateCirclePagination();
      },
    });
  }

  private setDefaultPlaceholders() {
    this.cameras = [
      {
        camera_id: 1,
        family_id: 1,
        camera_name: 'Caméra Salon (Mode Dev)',
        adr_ip: '',
        lien_http: '/exemple_cam.png',
        notif_state: 0,
      },
      {
        camera_id: 2,
        family_id: 1,
        camera_name: 'Caméra Entrée (Mode Dev)',
        adr_ip: '',
        lien_http: '/exemple_cam2.png',
        notif_state: 0,
      },
    ];
  }

  private updateCirclePagination() {
    this.circle_number = Array.from(
      { length: Math.ceil(this.cameras.length / 2) },
      (_, i) => i + 1,
    );
  }

  getSafeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  takeScreenshot(cam: any) {
    const familyId = this.user()?.family_id || 'unknown';
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:T]/g, '-').split('.')[0];
    const fileName = `${familyId}-${timestamp}.jpg`;

    const token = this.auth.getToken();
    const headers = new HttpHeaders().set('x-access-token', token || '');

    this.http
      .post(
        `${environment.apiUrl}/cameras/screenshot`,
        {
          camera_id: cam.camera_id,
          family_id: familyId,
          fileName: fileName,
        },
        { headers },
      )
      .subscribe(() => {
        this.showMessage('Capture sauvegardée !', 'success');
      });
  }

  handleImageError(cam: Camera, event: any) {
    if (event.target.src.includes('exemple_cam.png')) {
      console.warn(`Image de secours introuvable à la racine.`);
      return;
    }

    const newSet = new Set(this.failedCameraIds());
    newSet.add(cam.camera_id);
    this.failedCameraIds.set(newSet);

    event.target.src = '/exemple_cam.png';
  }

  getCameraUrl(cam: Camera): string {
    if (this.failedCameraIds().has(cam.camera_id)) {
      return '/exemple_cam.png';
    }

    let url = cam.lien_http;
    if (!url && cam.adr_ip) {
      url = `http://${cam.adr_ip}:8765/picture/${cam.camera_id}/frame`;
    }

    if (!url) return '/exemple_cam.png';

    const sep = url.includes('?') ? '&' : '?';
    return `${url}${sep}t=${this.currentTimestamp()}`;
  }

  toggleFullscreen(id: number) {
    this.fullscreenCameraId.update((current) => (current === id ? null : id));
  }

  toggleNotifications(cam: Camera) {
    const token = this.auth.getToken();
    const headers = new HttpHeaders().set('x-access-token', token || '');
    const newState = cam.notif_state === 1 ? 0 : 1;

    this.http
      .put(
        `${environment.apiUrl}/cameras/${cam.camera_id}`,
        {
          notif_state: newState,
        },
        { headers },
      )
      .subscribe({
        next: () => {
          cam.notif_state = newState;
          this.showMessage(`Notifications ${newState ? 'activées' : 'désactivées'}`, 'success');
        },
        error: (err) => {
          console.error('Erreur notifications:', err);
          this.showMessage('Échec de la mise à jour des notifications', 'error');
        },
      });
  }

  renameCamera(cam: Camera) {
    const newName = prompt('Nouveau nom pour la caméra :', cam.camera_name);
    if (newName && newName !== cam.camera_name) {
      const token = this.auth.getToken();
      const headers = new HttpHeaders().set('x-access-token', token || '');

      this.http
        .put(
          `${environment.apiUrl}/cameras/${cam.camera_id}`,
          {
            camera_name: newName,
          },
          { headers },
        )
        .subscribe({
          next: () => {
            cam.camera_name = newName;
            this.showMessage('Caméra renommée avec succès', 'success');
          },
          error: (err) => {
            console.error('Erreur renommage:', err);
            this.showMessage('Échec du changement de nom', 'error');
          },
        });
    }
  }
}
