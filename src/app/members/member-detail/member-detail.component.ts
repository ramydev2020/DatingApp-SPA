import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/Alertify.service';
import { UserService } from 'src/app/_services/user.service';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';


@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabs', {static: true}) memberTabs: TabsetComponent;
user: User ;
items: GalleryItem[];
imageData: any;
baseUrl = environment.apiUrl ;
  constructor(private userService: UserService , private alertifiy: AlertifyService ,
              private route: ActivatedRoute,public gallery: Gallery, 
              public lightbox: Lightbox,private authService: AuthService,
               private alertify: AlertifyService){ }
  ngOnInit() {
   this.route.data.subscribe(data => {
     debugger;
     debugger;
   this.user = data['user'].result;
   });
   this.route.queryParams.subscribe(params => {
    const selectedTab = params['tab'];
    this.memberTabs.tabs[selectedTab > 0 ? selectedTab : 0].active = true;
  });
   this.imageData = this.getImage();
   /** Basic Gallery Example */

    // Creat gallery items
    this.items = this.imageData.map(item => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl }));


    /** Lightbox Example */

    // Get a lightbox gallery ref
    const lightboxRef = this.gallery.ref('lightbox');

    // Add custom gallery config to the lightbox (optional)
   lightboxRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top
    });

    // Load items into the lightbox gallery ref
    lightboxRef.load(this.items);

  }
   getImage(){
    const imageUrls = [];
    debugger;
    for (let i = 0; i < this.user.photos.length; i++) {
      imageUrls.push({
        srcUrl:this.baseUrl+"/"+this.user.photos[i].url,
    previewUrl: this.baseUrl+"/"+this.user.photos[i].url
      });
    }
    debugger;
    return imageUrls;
 
}
selectTab(tabId: number) {
  this.memberTabs.tabs[tabId].active = true;
}
sendLike(id: number) {
  this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(data => {
    this.alertify.success('You have liked: ' + this.user.knownAs);
  }, error => {
    debugger;
    this.alertify.error(error);
  });
}
}

