import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-add-camera',
  standalone: false,
  templateUrl: './add.html',
  styleUrl: './add.scss',
})
export class Add implements OnInit {
  connectedUserFamilyId: number = 1;

  newCamera = {
    family_id: 0,
    camera_name: '',
    adr_ip: '',
    lien_http: '',
    notif_state: true,
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.newCamera.family_id = this.connectedUserFamilyId;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const dataToSend = {
      family_id: this.newCamera.family_id,
      camera_name: this.newCamera.camera_name,
      adr_ip: this.newCamera.adr_ip,
      lien_http: this.newCamera.lien_http,
      notif_state: this.newCamera.notif_state ? 1 : 0,
    };

    const apiUrl = 'http://localhost:8080/api/cameras';

    this.http.post(apiUrl, dataToSend).subscribe({
      next: (response) => {
        console.log('Réponse du backend :', response);
        alert(`La caméra ${dataToSend.camera_name} a été enregistrée avec succès !`);

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
