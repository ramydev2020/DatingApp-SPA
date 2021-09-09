import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../_models/message';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';
import { AlertifyService } from 'src/app/_services/Alertify.service';
import { tap } from 'rxjs/operators';
import { ResponseResult } from 'src/app/_models/ResponseResultDto';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() recipientId: number;
  messages:Message[];
  newMessage: any = {};
  baseUrl = environment.apiUrl ;
  constructor(private userService: UserService, private authService: AuthService,
      private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    const currentUserId = +this.authService.decodedToken.nameid;
    this.userService.getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
      .pipe(
        tap(messages => {
          debugger;
          for (let i = 0; i < messages.result.length; i++) {
            if (messages.result[i].isRead === false && messages.result[i].recipientId === currentUserId) {
              this.userService.markAsRead(currentUserId, messages.result[i].id);
            }
          }
        })
      )
      .subscribe(messages => {
        debugger;
        this.messages = messages.result;
    }, error => {
      this.alertify.error(error);
    });
  }

  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userService.sendMessage(this.authService.decodedToken.nameid, this.newMessage)
      .subscribe((message: Message) => {
        debugger;
        this.messages.unshift(message);
        this.authService.currentPhotoUrl.subscribe(photoUrl => message.senderPhotoUrl = photoUrl);
        message.senderKnownAs=this.authService.currentUser.userName;  
        this.newMessage.content = '';
    }, error => {
      this.alertify.error(error);
    });
  }

}