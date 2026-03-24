import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  cam_selected = 0;
  cam_list = ['/exemple_cam.png', '/exemple_cam2.png', '/exemple_cam3.png'];

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
