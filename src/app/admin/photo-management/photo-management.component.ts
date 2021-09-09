import { Component, OnInit } from '@angular/core';
import { PhotosForModerationDto } from 'src/app/_models/PhotosForModerationDto';
import { environment } from 'src/environments/environment';
 import { AdminService } from '../../_services/admin.service';

@Component({
  selector: 'app-photo-management',
  templateUrl: './photo-management.component.html',
  styleUrls: ['./photo-management.component.css']
})
export class PhotoManagementComponent implements OnInit {
  photos: any;
  baseUrl = environment.apiUrl ;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.getPhotosForApproval();
  }

  getPhotosForApproval() {
    this.adminService.getPhotosForApproval().subscribe((photos) => {
      debugger;
      console.log(photos);
      this.photos = photos.result;
      
      debugger;
    }, error => {
      console.log(error);
    });
  }

  approvePhoto(photoId) {
    this.adminService.approvePhoto(photoId).subscribe(() => {
      this.photos.splice(this.photos.findIndex(p => p.id === photoId), 1);
    }, error => {
      console.log(error);
    });
  }

  rejectPhoto(photoId) {
    this.adminService.rejectPhoto(photoId).subscribe(() => {
      this.photos.splice(this.photos.findIndex(p => p.id === photoId), 1);
    }, error => {
      console.log(error);
    });
  }

}