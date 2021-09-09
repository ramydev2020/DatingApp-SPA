import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AlertifyService } from '../_services/Alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;
  baseUrl = environment.apiUrl;
  constructor(public authService: AuthService,
    private alertify:AlertifyService,
    private router: Router
    ) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }
 login(){
this.authService.login(this.model).subscribe(next => {
this.alertify.success('Done Login');
},
error => {
this.alertify.error(error);
}, () => {
  this.router.navigate(['/member']);
}
)
}
  loggedIn(){
  return this.authService.loggedIn();
  }
  
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }
}
