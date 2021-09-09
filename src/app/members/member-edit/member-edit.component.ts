import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/Alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
user: User ;
photoUrl: string;
baseUrl = environment.apiUrl ;
@ViewChild('editForm', {static: true}) editForm: NgForm;
@HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(private route: ActivatedRoute, private userService: UserService ,
    private alertify: AlertifyService, private authservice: AuthService) { }
  ngOnInit() {
    this.route.data.subscribe(data => {
      debugger;
      this.user = data['user'].result;
      });
      this.authservice.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }
  
  updateUser() {
    this.userService.updateUser(this.authservice.decodedToken.nameid, this.user).subscribe(next => {
      this.alertify.success('Profile updated successfully');
      this.editForm.reset(this.user);
    }, error => {
      this.alertify.error(error);
    });
  }
  updateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
  }
}
