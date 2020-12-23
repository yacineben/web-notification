import { Component, OnInit } from '@angular/core';
import { PushNotificationsService } from 'ng-push-ivy';
import { WebsocketService } from './shared/services/websocket.service';
import { NotificationService } from './shared/services/notification.service';
import { AppNotification } from './shared/model/app-notification';
import { AppMail } from './shared/model/app-mail';

const icon = new Map([
  ['info', 'assets/bell-info.png'],
  ['warn', 'assets/bell-warning.png']
]);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Web push Notifications!';
  counter: number;

  constructor(private pushNotifications: PushNotificationsService,
              private notificationService: NotificationService,
              private websocketService: WebsocketService) {
    this.pushNotifications.requestPermission();
    this.counter = 0;
  }

  ngOnInit() {
    this.connect();
  }
  connect(): void {
    this.websocketService.connect();

    // subscribe receives the value.
    this.notificationService.notificationMessage.subscribe((data) => {
      console.log('receive notification message', data);
      this.notify(data);
    });

    // subscribe receives the value.
    this.notificationService.mailFailMessage.subscribe((data) => {
      console.log('receive fail message', data);
      this.notifyMailFail(data);
    });

    // subscribe receives the value.
    this.notificationService.mailArchiveMessage.subscribe((data) => {
      console.log('receive archive message', data);
      this.notifyMailArchive(data);
    });
  }

  disconnect(): void {
    this.websocketService.disconnect();
  }


  notify(message: AppNotification): void {
    this.counter++;
    const options = {
      body: message.content,
      icon: icon.get(message.type.toLowerCase())
    };
    this.pushNotifications.create('New Notification', options).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

  notifyMailFail(message: AppMail): void {
      this.counter++;
      const options = {
        body: "Cause : " +message.failureCause,
        icon: icon.get(message.type.toLowerCase())
      };
      this.pushNotifications.create('Mail fail', options).subscribe(
        res => console.log(res),
        err => console.log(err)
      );
    }

  notifyMailArchive(message: AppMail): void {
        this.counter++;
        const options = {
          body: message.subject,
          icon: icon.get(message.type.toLowerCase())
        };
        this.pushNotifications.create('Mail Success', options).subscribe(
          res => console.log(res),
          err => console.log(err)
        );
      }
}
