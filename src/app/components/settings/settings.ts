import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

type SettingKey = 'quality' | 'notifications' | 'storage' | 'backup' | 'account';

interface SettingItem {
  id: number;
  key: SettingKey;
  title: string;
  important: boolean;
}

@Component({
  selector: 'app-settings',
  standalone: false,
  templateUrl: './settings.html',
  styleUrls: ['./settings.scss'],
})
export class Settings implements OnInit {
  searchValue: string = '';
  onlyImportant: boolean = false;
  compactView: boolean = false;
  selectedSettingId: number = -1;
  openedSetting: SettingKey | null = null;
  feedbackMessage: string = '';

  settingsList: SettingItem[] = [
    { id: 1, key: 'quality', title: 'Qualité par défaut', important: true },
    { id: 2, key: 'notifications', title: 'Notifications', important: true },
    { id: 3, key: 'storage', title: 'Stockage', important: true },
    { id: 4, key: 'backup', title: 'Sauvegarde', important: false },
    { id: 5, key: 'account', title: 'Compte', important: false },
  ];

  displayedSettings: SettingItem[] = [];

  qualitySettings = {
    resolution: '1080p',
    fps: 25,
    streamQuality: 'Élevée',
    adaptiveMode: true,
    snapshotQuality: 'Haute',
    recordingQuality: 'Haute',
  };

  notificationSettings = {
    enabled: true,
    movement: true,
    disconnect: true,
    technicalErrors: true,
    recordingDone: false,
    snapshotDone: false,
    channel: 'In-app',
    frequency: 'Immédiat',
  };

  storageSettings = {
    usedSpace: '3.2 Go',
    remainingSpace: '12.8 Go',
    retentionDays: 30,
    autoDelete: true,
    maxRecordingSize: 500,
    maxSnapshots: 200,
  };

  backupSettings = {
    enabled: true,
    frequency: 'Hebdomadaire',
    destination: 'Local',
    includeImages: true,
    includeVideos: true,
    lastBackup: '28/04/2026 09:20',
  };

  accountSettings = {
    username: 'Operateur CamView',
    email: 'operateur@camview.local',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.refreshDisplayedSettings();
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchValue = input.value;
    this.refreshDisplayedSettings();
  }

  toggleImportantFilter(): void {
    this.onlyImportant = !this.onlyImportant;
    this.refreshDisplayedSettings();
  }

  toggleCompactView(): void {
    this.compactView = !this.compactView;
  }

  openSetting(setting: SettingItem): void {
    this.selectedSettingId = setting.id;
    this.openedSetting = setting.key;
    this.feedbackMessage = '';
  }

  closeSettingPanel(): void {
    this.openedSetting = null;
    this.feedbackMessage = '';
  }

  refreshDisplayedSettings(): void {
    const search = this.searchValue.trim().toLowerCase();

    let list = [...this.settingsList];

    if (this.onlyImportant) {
      list = list.filter((item) => item.important);
    }

    if (search !== '') {
      list = list.filter((item) => item.title.toLowerCase().includes(search));
    }

    this.displayedSettings = list;
  }

  getOpenedSettingTitle(): string {
    const setting = this.settingsList.find((item) => item.key === this.openedSetting);
    return setting ? setting.title : 'Paramètres';
  }

  saveQualitySettings(): void {
    this.feedbackMessage = 'Les paramètres de qualité ont été enregistrés.';
    this.clearFeedbackLater();
  }

  saveNotificationSettings(): void {
    this.feedbackMessage = 'Les paramètres de notifications ont été enregistrés.';
    this.clearFeedbackLater();
  }

  testNotification(): void {
    this.feedbackMessage = 'Notification de test envoyée.';
    this.clearFeedbackLater();
  }

  markAllNotificationsRead(): void {
    this.feedbackMessage = 'Toutes les notifications ont été marquées comme lues.';
    this.clearFeedbackLater();
  }

  openNotificationsPage(): void {
    this.router.navigate(['/notifications']);
  }

  saveStorageSettings(): void {
    this.feedbackMessage = 'Les paramètres de stockage ont été enregistrés.';
    this.clearFeedbackLater();
  }

  openArchivesPage(): void {
    this.router.navigate(['/files']);
  }

  saveBackupSettings(): void {
    this.feedbackMessage = 'Les paramètres de sauvegarde ont été enregistrés.';
    this.clearFeedbackLater();
  }

  launchBackupNow(): void {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    this.backupSettings.lastBackup = `${day}/${month}/${year} ${hours}:${minutes}`;
    this.feedbackMessage = 'Sauvegarde lancée avec succès.';
    this.clearFeedbackLater();
  }

  exportArchives(): void {
    this.feedbackMessage = 'Export des archives lancé.';
    this.clearFeedbackLater();
  }

  onImportBackup(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.feedbackMessage = `Fichier sélectionné : ${input.files[0].name}`;
      this.clearFeedbackLater();
    }
  }

  saveAccountSettings(): void {
    if (this.accountSettings.newPassword !== this.accountSettings.confirmPassword) {
      this.feedbackMessage = 'Les mots de passe ne correspondent pas.';
      this.clearFeedbackLater();
      return;
    }

    this.feedbackMessage = 'Les informations du compte ont été enregistrées.';
    this.accountSettings.currentPassword = '';
    this.accountSettings.newPassword = '';
    this.accountSettings.confirmPassword = '';
    this.clearFeedbackLater();
  }

  logout(): void {
    this.router.navigate(['/log-in']);
  }

  trackBySettingId(index: number, setting: SettingItem): number {
    return setting.id;
  }

  private clearFeedbackLater(): void {
    setTimeout(() => {
      this.feedbackMessage = '';
    }, 2500);
  }
}
