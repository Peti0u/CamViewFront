import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './cameras.html',
  styleUrl: './cameras.scss',
})
export class Cameras {
  cameras = [
    {
      lien: '/exemple_cam.png',
      nom: '',
    },
    {
      lien: '/exemple_cam2.png',
      nom: '',
    },
    {
      lien: '/exemple_cam3.png',
      nom: '',
    },
    {
      lien: '/exemple_cam3.png',
      nom: '',
    },
    {
      lien: '/exemple_cam3.png',
      nom: '',
    },
  ];

  id_circle = 0;
  circle_number = Array.from({ length: Math.ceil(this.cameras.length / 2) }, (_, i) => i + 1); //nb de cercles a afficher dans la nav

  // constructor(private router: Router) {}
  // ngOnInit() {
  //   const clearModals = setInterval(() => {
  //     const glass = document.querySelector('.modal-glass');
  //     const container = document.querySelector('.modal-container');
  //     if (glass || container) {
  //       glass?.remove();
  //       container?.remove();
  //       console.log('Modales de connexion supprimées');
  //     }
  //   }, 500);
  // }
}
