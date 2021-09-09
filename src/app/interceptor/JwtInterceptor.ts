import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const token = localStorage.getItem('token');
         const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (token && isApiUrl) {
          request = request.clone({
              setHeaders: {
                  Authorization: `Bearer ${token}`,
                  Lang: `${'arabic'}`
              }
          });
        } else {
          request = request.clone({
            setHeaders: {
              Lang: `${'arabic'}`
            }
        });
        }
        return next.handle(request);
    }
}