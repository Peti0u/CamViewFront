import { Component, OnInit, signal, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  apiUrl = environment.apiUrl;
  // On extrait l'URL de base sans le /api pour les images
  baseServerUrl = environment.apiUrl.replace(/\/api$/, '');

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  user = signal<any>(null);
  isModalOpen = signal(false);
  message = signal<string | null>(null);
  messageType = signal<'success' | 'error' | null>(null);
  cam_selected = 0;
  cam_list = ['/exemple_cam.png', '/exemple_cam2.png', '/exemple_cam3.png'];

  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadProfile();
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

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);

      const token = this.auth.getToken();
      const headers = new HttpHeaders().set('x-access-token', token || '');

      this.http.post(`${environment.apiUrl}/user/avatar`, formData, { headers }).subscribe({
        next: (res: any) => {
          this.showMessage(res.message || 'Photo mise à jour !', 'success');
          this.loadProfile();
        },
        error: (err) => {
          this.showMessage(err.error?.message || "Erreur lors de l'envoi de l'image", 'error');
        },
      });
    }
  }

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  updateProfile() {
    const token = this.auth.getToken();
    const headers = new HttpHeaders().set('x-access-token', token || '');
    this.http.put(`${environment.apiUrl}/user/update`, this.user(), { headers }).subscribe({
      next: (res: any) => {
        this.showMessage(res.message || 'Profil mis à jour avec succès !', 'success');
        this.closeModal();
        this.loadProfile();
      },
      error: (err) => {
        this.showMessage(err.error?.message || 'Erreur lors de la modification', 'error');
        this.closeModal();
      },
    });
  }

  ChangeCam(id: number, sens: string) {
    if (id != -1) {
      this.cam_selected = id;
    } else if (sens == 'next') {
      if (this.cam_selected == 2) {
        this.cam_selected = 0;
      } else {
        this.cam_selected += 1;
      }
    } else {
      if (this.cam_selected == 0) {
        this.cam_selected = 2;
      } else {
        this.cam_selected -= 1;
      }
    }
  }
}
