import { Component } from '@angular/core';

@Component({
  selector: 'app-files',
  standalone: false,
  templateUrl: './files.html',
  styleUrl: './files.scss',
})
export class Files {
  id_folder_opened = -1;

  folders = [
    {
      name: 'Folder1',
      content: [
        {
          archive_id: 0,
          camera_id: 0,
          archive_name: 'Capture1',
          video_path: '',
          image_path: '',
          creation_date: '21/04/26 13h47',
        },
      ],
    },
    {
      name: 'Folder2',
      content: [
        {
          archive_id: 1,
          camera_id: 1,
          archive_name: 'Capture2',
          video_path: '',
          image_path: '',
          creation_date: '22/04/26 18h12',
        },
      ],
    },
  ];
}
