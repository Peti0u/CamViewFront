import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ArchiveServices } from '../../services/archive/archive-services';
import { ArchiveModel } from '../../models/archive-model';

@Component({
  selector: 'app-files',
  standalone: false,
  templateUrl: './files.html',
  styleUrl: './files.scss',
})
export class Files implements OnInit {
  archives_services = inject(ArchiveServices);
  cdr = inject(ChangeDetectorRef);

  id_folder_opened = -1;

  folders = [
    {
      name: 'Photos',
      content: [] as ArchiveModel[],
    },
    {
      name: 'Vidéos',
      content: [] as ArchiveModel[],
    },
  ];

  ngOnInit() {
    this.archives_services.GetAllImages().subscribe({
      next: (data) => {
        this.folders[0].content = data;
        this.cdr.detectChanges();
      },
    });

    this.archives_services.GetAllVideos().subscribe({
      next: (data) => {
        this.folders[1].content = data;
        this.cdr.detectChanges();
      },
    });
  }
}
