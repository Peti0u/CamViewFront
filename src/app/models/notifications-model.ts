export class NotificationsModel {
  notification_id?: number;
  camera_id: number;
  notification_name: string;
  notification_content: string;
  is_read: boolean;
  creation_date: Date;

  constructor(
    camera_id: number,
    notification_name: string,
    notification_content: string,
    is_read: boolean,
    creation_date: Date,
  ) {
    this.camera_id = camera_id;
    this.notification_name = notification_name;
    this.notification_content = notification_content;
    this.is_read = is_read;
    this.creation_date = creation_date;
  }
}
