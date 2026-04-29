import { Component, OnInit, OnDestroy, signal, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
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
  safe_url?: SafeResourceUrl;
}

@Component({
  selector: 'app-cameras',
  standalone: false,
  templateUrl: './cameras.html',
  styleUrl: './cameras.scss',
})
export class Cameras implements OnInit, OnDestroy {
  cameras: Camera[] = [];
  id_circle = 0;
  circle_number: number[] = [];
  user = signal<any>(null);
  message = signal<string | null>(null);
  messageType = signal<'success' | 'error' | null>(null);
  safeUrls = new Map<number, SafeResourceUrl>();

  private refreshInterval: any;
  failedCameraIds = signal<Set<number>>(new Set());
  currentTimestamp = signal<number>(Date.now());
  fullscreenCameraId = signal<number | null>(null);

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private auth: AuthService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loadProfile();
    this.loadCameras();

    this.refreshInterval = setInterval(() => {
      this.currentTimestamp.set(Date.now());
      this.failedCameraIds.set(new Set());
    }, 60000);
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
          this.cameras = data.map((cam) => {
            const url = this.getCameraUrl(cam);
            if (url && !url.startsWith('/')) {
              cam.safe_url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
            }
            return cam;
          });
        } else {
          this.setDefaultPlaceholders();
        }

        this.updateCirclePagination();

        setTimeout(() => {
          this.cdr.detectChanges();
        }, 200);
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

  async takeScreenshot(cam: any) {
    const familyId = this.user()?.family_id || 'unknown';
    const scale = 4;

    let url = this.getCameraUrl(cam).replace(
      environment.cameraBaseUrl,
      environment.cameraProxyPath,
    );
    if (url.endsWith('/frame')) url = url.replace('/frame', '/current/');

    try {
      const response = await fetch(url);
      const blob = await response.blob();

      const img = await createImageBitmap(blob);
      const canvas = document.createElement('canvas');

      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (resizedBlob) => {
          if (!resizedBlob) return;

          const timestamp = new Date().toISOString().replace(/[:T]/g, '-').split('.')[0];
          const fileName = `${familyId}-${timestamp}.jpg`;
          const formData = new FormData();
          formData.append('image', resizedBlob, fileName);
          formData.append('camera_id', cam.camera_id.toString());
          formData.append('family_id', familyId.toString());

          const token = this.auth.getToken();
          const headers = new HttpHeaders().set('x-access-token', token || '');

          this.http
            .post(`${environment.apiUrl}/cameras/upload-screenshot`, formData, { headers })
            .subscribe({
              next: () => this.showMessage(`Capture x${scale} sauvegardée !`, 'success'),
              error: () => this.showMessage('Erreur sauvegarde', 'error'),
            });
        },
        'image/jpeg',
        0.9,
      );
    } catch (err) {
      console.error(err);
      this.showMessage('Échec de la capture', 'error');
    }
  }

  getSafeCameraUrl(cam: Camera): SafeResourceUrl {
    const url = this.getCameraUrl(cam);
    if (!url) return '';
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  getCameraUrl(cam: Camera): string {
    let url = cam.lien_http;
    if (!url && cam.adr_ip) url = `http://${cam.adr_ip}:8765/picture/${cam.camera_id}/frame`;
    return url || '';
  }

  handleImageError(cam: Camera, event: any) {
    console.error(
      `Erreur de chargement pour la caméra ${cam.camera_name} à l'URL:`,
      event.target.src,
    );
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
