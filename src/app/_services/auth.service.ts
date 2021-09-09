import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

baseUrl = environment.apiUrl + 'Auth/';
jwtHelper = new JwtHelperService();
decodedToken: any;
currentUser: User;
photoUrl = new BehaviorSubject<string>('../../assets/user.png');
currentPhotoUrl = this.photoUrl.asObservable();
constructor(private http: HttpClient) { }
changeMemberPhoto(photoUrl: string) {
  this.photoUrl.next(photoUrl);
}
  login(model: any){
  return this.http.post(this.baseUrl + 'Login', model).pipe(
  map((response: any) => {
   const data = response;
   debugger;
   if (data) {
    localStorage.setItem('token', data.result.token);
          localStorage.setItem('user', JSON.stringify(data.result.user));
          this.decodedToken = this.jwtHelper.decodeToken(data.result.token);
          this.currentUser = data.result.user;
          this.changeMemberPhoto(this.currentUser.photoUrl);
  }

 })

);

}
 register(model: any){
  return this.http.post(this.baseUrl + 'Register', model);
}
 loggedIn(){
 const token = localStorage.getItem('token');
 return !this.jwtHelper.isTokenExpired(token);
 }
 roleMatch(allowedRoles): boolean {
  let isMatch = false;
  const userRoles = this.decodedToken.role as Array<string>;
  allowedRoles.forEach(element => {
    if (userRoles.includes(element)) {
      isMatch = true;
      return;
    }
  });
  return isMatch;
}

}
