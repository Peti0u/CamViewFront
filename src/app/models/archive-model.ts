export class ArchiveModel {
  archive_id?: number;
  camera_id: number;
  archive_name: string;
  video_path: string;
  image_path: string;
  creation_date: Date;

  constructor(
    camera_id: number,
    archive_name: string,
    video_path: string,
    image_path: string,
    creation_date: Date,
  ) {
    this.camera_id = camera_id;
    this.archive_name = archive_name;
    this.video_path = video_path;
    this.image_path = image_path;
    this.creation_date = creation_date;
  }
}
