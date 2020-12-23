import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { WEBSOCKET_ENDPOINT, WEBSOCKET_MAIL_FAIL_TOPIC, WEBSOCKET_MAIL_ARCHIVE_TOPIC, WEBSOCKET_NOTIFICATION_TOPIC } from '../constants/base-url.constants';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  stompClient: any;

  constructor(private notificationService: NotificationService) { }

  connect(): void {
    console.log('webSocket Connection');
    const ws = new SockJS(WEBSOCKET_ENDPOINT);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function(frame) {
        _this.stompClient.subscribe(WEBSOCKET_MAIL_FAIL_TOPIC, function(sdkEvent) {
            _this.onMessageFailReceived(sdkEvent);
        });
        _this.stompClient.subscribe(WEBSOCKET_MAIL_ARCHIVE_TOPIC, function(sdkEvent) {
            _this.onMessageArchiveReceived(sdkEvent);
        });
        _this.stompClient.subscribe(WEBSOCKET_NOTIFICATION_TOPIC, function(sdkEvent) {
            _this.onMessageNotificationReceived(sdkEvent);
        });
    }, this.errorCallBack);
}


  disconnect(): void {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

   // on error, schedule a reconnection attempt
   errorCallBack(error) {
    console.log('errorCallBack -> ' + error);
    setTimeout(() => {
        this.connect();
    }, 5000);
  }
  onMessageArchiveReceived(message) {
    console.log('Archive Message Recieved from Server :: ' + message);
   // Emits the event.
    this.notificationService.mailArchiveMessage.emit(JSON.parse(message.body));
  }
  onMessageFailReceived(message) {
    console.log('Fail Message Recieved from Server :: ' + message);
   // Emits the event.
    this.notificationService.mailFailMessage.emit(JSON.parse(message.body));
  }

  onMessageNotificationReceived(message) {
    console.log('Notification Message Recieved from Server :: ' + message);
    // Emits the event.
    this.notificationService.notificationMessage.emit(JSON.parse(message.body));
  }

}
