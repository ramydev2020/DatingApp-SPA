import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Message } from '../_models/Message';
import { PaginatedResult } from '../_models/Pagination';
import { ResponseResult } from '../_models/ResponseResultDto';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

 baseUrl = environment.apiUrl ;

constructor(private http: HttpClient) { }

getUsers(page?, itemsPerPage?, userParams?,likesParam?): Observable<PaginatedResult<User[]>> {
  const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

  let params = new HttpParams();

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }
  if (userParams != null) {
    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);
  }
  if (likesParam === 'Likers') {
    params = params.append('Likers', 'true');
  }

  if (likesParam === 'Likees') {
    params = params.append('Likees', 'true');
  }
  return this.http.get<User[]>(this.baseUrl+'api/v1.0/Users/GetUsers', { observe: 'response', params})
  .pipe(
    map(response => {
      debugger;
      paginatedResult.result = response.body;
      if (response.headers.get('Pagination') != null) {
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
      }
      return paginatedResult;
    })
  );
}

getUser(id: number): Observable<User>{
return this.http.get<User>(this.baseUrl +'api/v1.0/users/GetUser/' + id);
}
 
updateUser(id: number, user: User) {
  return this.http.put(this.baseUrl +'api/v1.0/users/UpdateUser/' + id, user);
}
setMainPhoto(userId: number, id: number) {
  return this.http.post(this.baseUrl +'users/' + userId + '/photos/' + id + '/setMain', {});
}
deletePhoto(userId: number, id: number) {
  return this.http.delete(this.baseUrl +'users/' + userId + '/photos/' + id);
}
sendLike(id: number, recipientId: number) {
  return this.http.post(this.baseUrl +'api/v1.0/users/LikeUser/' + id + '/like/' + recipientId, {});
}
getMessages(id: number, page?, itemsPerPage?, messageContainer?) {
  const paginatedResult: PaginatedResult<Message[]> = new PaginatedResult<Message[]>();

  let params = new HttpParams();

  params = params.append('MessageContainer', messageContainer);

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  return this.http.get<Message[]>(this.baseUrl +'users/' + id + '/messages', {observe: 'response', params})
    .pipe(
      map(response => {
        debugger;
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }

        return paginatedResult;
      })
    );
}

getMessageThread(id: number, recipientId: number) {
  debugger;
  return this.http.get<ResponseResult<Message[]>>(this.baseUrl +'users/' + id + '/messages/thread/' + recipientId);
}

sendMessage(id: number, message: Message) {
  return this.http.post(this.baseUrl +'users/' + id + '/messages', message);
}

deleteMessage(id: number, userId: number) {
  return this.http.post(this.baseUrl +'users/' + userId + '/messages/' + id, {});
}

markAsRead(userId: number, messageId: number) {
  debugger;
  this.http.post(this.baseUrl +'users/' + userId + '/messages/' + messageId + '/read', {})
    .subscribe();
}

}