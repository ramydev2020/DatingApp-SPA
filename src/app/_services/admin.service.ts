import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { ResponseUser, User } from '../_models/user';
import { PhotosForModerationDto, ResponsePhotosResult } from '../_models/PhotosForModerationDto';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsersWithRoles() {
    return this.http.get<ResponseUser<User[]>>(this.baseUrl +'Admin/usersWithRoles');
  }

  updateUserRoles(user: User, roles: {}) {
    debugger;
    return this.http.post(this.baseUrl +'admin/editRoles/' + user.userName, roles);
  }

  getPhotosForApproval() {
    return this.http.get<ResponsePhotosResult<PhotosForModerationDto[]>>(this.baseUrl +'admin/photosForModeration');
  }

  approvePhoto(photoId) {
    return this.http.post(this.baseUrl +'admin/approvePhoto/' + photoId, {});
  }

  rejectPhoto(photoId) {
    return this.http.post(this.baseUrl +'admin/rejectPhoto/' + photoId, {});
  }
}