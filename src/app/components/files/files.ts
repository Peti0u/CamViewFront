import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ArchiveServices } from '../../services/archive/archive-services';
import { ArchiveModel } from '../../models/archive-model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-files',
  standalone: false,
  templateUrl: './files.html',
  styleUrl: './files.scss',
})
export class Files implements OnInit {
  archives_services = inject(ArchiveServices);
  cdr = inject(ChangeDetectorRef);

  // URL de base pour les médias (ex: https://api-camview.esiah.dev)
  baseServerUrl = environment.apiUrl.replace(/\/api$/, '');

  currentPath = '';
  items: any[] = [];
  movingItem: any | null = null;
  previewTimestamp = 0;
  selectedMedia: string | null = null;

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.archives_services.ListFiles(this.currentPath).subscribe((data) => {
      this.items = data;
      this.cdr.detectChanges();
    });
  }

  navigateInto(item: any) {
    if (item.isDirectory) {
      this.currentPath = item.path;
      this.refresh();
    } else {
      this.previewTimestamp = Date.now();
      this.selectedMedia = item.url;
    }
  }

  getMediaUrl(url: string | null): string {
    if (!url) return '';
    // On ajoute un timestamp pour éviter que le navigateur n'affiche une version corrompue en cache
    return `${this.baseServerUrl}${url}?t=${this.previewTimestamp}`;
  }

  goBack() {
    const parts = this.currentPath.split('/');
    parts.pop();
    this.currentPath = parts.join('/');
    this.refresh();
  }

  addNewFolder() {
    const name = prompt('Nom du nouveau dossier :');
    if (name) {
      this.archives_services.CreateFolder(name, this.currentPath).subscribe(() => this.refresh());
    }
  }

  initiateMove(item: any, event: Event) {
    event.stopPropagation();
    this.movingItem = item;
  }

  confirmMove() {
    if (!this.movingItem) return;

    // Sécurité : éviter de déplacer un dossier dans lui-même
    if (
      this.movingItem.isDirectory &&
      (this.currentPath === this.movingItem.path ||
        this.currentPath.startsWith(this.movingItem.path + '/'))
    ) {
      alert(
        "Action impossible : un dossier ne peut pas être déplacé dans lui-même ou dans l'un de ses sous-dossiers.",
      );
      return;
    }

    this.archives_services.MoveItem(this.movingItem.path, this.currentPath).subscribe({
      next: () => {
        this.movingItem = null;
        this.refresh();
      },
      error: (err) => alert(err.error?.message || 'Erreur lors du déplacement'),
    });
  }

  cancelMove() {
    this.movingItem = null;
  }

  renameItem(item: any, event: Event) {
    event.stopPropagation();

    let nameToEdit = item.name;
    let extension = '';

    // Si c'est un fichier, on extrait l'extension pour la protéger
    if (!item.isDirectory) {
      const lastDotIndex = item.name.lastIndexOf('.');
      if (lastDotIndex > 0) {
        nameToEdit = item.name.substring(0, lastDotIndex);
        extension = item.name.substring(lastDotIndex);
      }
    }

    const newNamePart = prompt("Nouveau nom (l'extension sera conservée) :", nameToEdit);

    if (newNamePart && newNamePart !== nameToEdit) {
      // On concatène le nouveau nom avec l'ancienne extension
      const finalName = newNamePart + extension;
      this.archives_services.RenameItem(item.path, finalName).subscribe(() => this.refresh());
    }
  }

  infoItem(item: any, event: Event) {
    event.stopPropagation();
    const type = item.isDirectory ? 'Dossier' : 'Fichier';
    alert(`${type} : ${item.name}\nChemin complet : ${item.path}`);
  }

  deleteItem(item: any, event: Event) {
    event.stopPropagation();
    if (confirm(`Supprimer ${item.name} ?`)) {
      this.archives_services.DeleteItem(item.path).subscribe(() => this.refresh());
    }
  }

  closePreview() {
    this.selectedMedia = null;
  }

  isImage(url: string | null): boolean {
    if (!url) return false;
    const cleanUrl = url.split('?')[0]; // On ignore les paramètres de cache
    const ext = cleanUrl?.split('.').pop()?.toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '');
  }

  isVideo(url: string | null): boolean {
    if (!url) return false;
    const cleanUrl = url.split('?')[0]; // On ignore les paramètres de cache
    const ext = cleanUrl?.split('.').pop()?.toLowerCase();
    return ['mp4', 'webm', 'ogg'].includes(ext || '');
  }
}
