import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SecurityAppService } from '@app/services/security-app.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private serviceSvc: SecurityAppService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(e => {
      if (e.status === 401){
        // auto logout if 401 response returned from api
        // this._authenticationService.logout();
        // locatioon.reload(true);
        //this.serviceSvc.removeToken();
        // window.location.reload();
        console.log('ERROR INTERCEPT 401');
      }

      // switch (e.status) {
      //   case 401:
      //     break;
      //   case 404:
      //     break;
      //   case 500:
      //     break;
      //   default:
      //     break;
      // }

      return throwError(e);
    }));
    // return next.handle(request);
  }
}
