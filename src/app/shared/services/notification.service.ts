import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notificationMessage = new EventEmitter();
  mailFailMessage = new EventEmitter();
  mailArchiveMessage = new EventEmitter();
  constructor() { }


}
