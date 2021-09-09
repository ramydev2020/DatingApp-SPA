import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptor, ErrorInterceptorProvider } from './_services/error.interceptor';
import { AlertifyService } from './_services/Alertify.service';
import { CommonModule } from '@angular/common';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth.guard';
import { UserService } from './_services/user.service';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MemberDetailResolver } from './_resolvers/member-details.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';
import { JwtInterceptor } from './interceptor/JwtInterceptor';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { PhotoEditorComponent } from './members/Photo-editor/Photo-editor.component';
import {FileUploadModule} from 'ng2-file-upload';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimeAgoModule } from './time-ago/time-ago.module';
import { ListsResolver } from './_resolvers/lists.resolver';
import { MessagesResolver } from './_resolvers/Messages.Resolver';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { AdminService } from './_services/admin.service';
import { HasRoleDirective } from './_directives/hasRole.directive';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { PhotoManagementComponent } from './admin/photo-management/photo-management.component';
import { RolesModalComponent } from './admin/roles-modal/roles-modal.component';
 

@NgModule({
  declarations: [
    AppComponent,
     NavComponent,
      HomeComponent,
      RegisterComponent,
      MemberListComponent,
      ListsComponent,
      MessagesComponent,
      MemberCardComponent,
      MemberDetailComponent,
      MemberEditComponent,
      PhotoEditorComponent,
      MemberMessagesComponent,
      HasRoleDirective,
      UserManagementComponent,
      PhotoManagementComponent,
      RolesModalComponent,
      AdminPanelComponent
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    CommonModule,
    ModalModule.forRoot(),
    GalleryModule,
    LightboxModule,
    FileUploadModule,
    RouterModule.forRoot(appRoutes),
    TabsModule.forRoot(),
    TimeAgoModule
   ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    AlertifyService,
    AuthGuard,
    UserService,
    AdminService,
    MemberDetailResolver,
    MemberListResolver,
    MemberEditResolver,
    ListsResolver,
    MessagesResolver,
    PreventUnsavedChanges,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
