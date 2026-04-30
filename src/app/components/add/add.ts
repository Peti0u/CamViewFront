import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { API_ENDPOINTS } from '../../config/constants';

@Component({
  selector: 'app-add-camera',
  standalone: false,
  templateUrl: './add.html',
  styleUrl: './add.scss',
})
export class Add implements OnInit {
  connectedUserFamilyId: number = 0;

  newCamera = {
    family_id: 0,
    camera_name: '',
    adr_ip: '',
    lien_http: '',
    notif_state: true,
  };

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit() {
    // Récupération de l'utilisateur depuis le stockage de session
    const userData = sessionStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.connectedUserFamilyId = user.family_id;
      this.newCamera.family_id = user.family_id;
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const dataToSend = {
      camera_name: this.newCamera.camera_name,
      adr_ip: this.newCamera.adr_ip,
      lien_http: this.newCamera.lien_http,
      notif_state: this.newCamera.notif_state ? 1 : 0,
    };

    const apiUrl = `${environment.apiUrl}${API_ENDPOINTS.CAMERAS}`;

    this.http.post(apiUrl, dataToSend).subscribe({
      next: (response) => {
        console.log('Réponse du backend :', response);
        this.router.navigate(['/cameras']);

        form.resetForm({
          family_id: this.connectedUserFamilyId,
          camera_name: '',
          adr_ip: '',
          lien_http: '',
          notif_state: true,
        });
      },
      error: (error) => {
        console.error("Erreur lors de l'ajout en BDD :", error);
        alert("Une erreur est survenue lors de l'ajout de la caméra.");
      },
    });
  }
}
