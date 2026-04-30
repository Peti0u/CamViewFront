import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NotificationsServices } from '../../services/notifications/notifications-services';
import { NotificationsModel } from '../../models/notifications-model';

@Component({
  selector: 'app-notifications',
  standalone: false,
  templateUrl: './notifications.html',
  styleUrl: './notifications.scss',
})
export class Notifications implements OnInit, OnDestroy {
  notifications_services = inject(NotificationsServices);
  cdr = inject(ChangeDetectorRef);

  notifications: NotificationsModel[] = [];
  private refreshInterval: any;

  ngOnInit() {
    this.refresh();
    // Rafraîchissement automatique toutes les minutes
    this.refreshInterval = setInterval(() => this.refresh(), 60000);
  }

  ngOnDestroy() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  refresh() {
    this.notifications_services.GetAll().subscribe({
      next: (data: NotificationsModel[]) => {
        this.notifications = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erreur notifications:', err),
    });
  }
}
