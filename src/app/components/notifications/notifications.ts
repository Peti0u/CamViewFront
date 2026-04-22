import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { NotificationsServices } from '../../services/notifications/notifications-services';
import { NotificationsModel } from '../../models/notifications-model';

@Component({
  selector: 'app-notifications',
  standalone: false,
  templateUrl: './notifications.html',
  styleUrl: './notifications.scss',
})
export class Notifications implements OnInit {
  notifications_services = inject(NotificationsServices);
  cdr = inject(ChangeDetectorRef);

  notifications: NotificationsModel[] = [];

  ngOnInit() {
    this.notifications_services.GetAll().subscribe({
      next: (data: NotificationsModel[]) => {
        this.notifications = data;
        console.log('Data', data);
        this.cdr.detectChanges();
      },
    });
  }
}
