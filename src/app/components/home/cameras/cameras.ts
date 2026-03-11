import { Component } from '@angular/core';

@Component({
  selector: 'app-cameras',
  standalone: false,
  templateUrl: './cameras.html',
  styleUrl: './cameras.scss',
})
export class Cameras {
  onInit() {
    console.log('Cameras component initialized');
  }
}
