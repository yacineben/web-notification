
import { environment } from 'src/environments/environment';

export const  WEBSOCKET_ENDPOINT = `${environment.WS_BASE_URL}`;
export const  WEBSOCKET_MAIL_FAIL_TOPIC = '/topic/mail_fail';
export const  WEBSOCKET_MAIL_ARCHIVE_TOPIC = '/topic/mail_archive';
export const  WEBSOCKET_NOTIFICATION_TOPIC = '/topic/notification';
