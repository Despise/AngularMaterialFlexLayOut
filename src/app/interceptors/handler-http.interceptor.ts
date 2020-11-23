import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { SecurityAppService } from '@app/services/security-app.service';
import { catchError, filter, switchMap, take } from 'rxjs/operators';

@Injectable()
export class HandlerHttpInterceptor implements HttpInterceptor {
  private accessToken = '';
  private isRefreshing = false;
  private refreshToken$ = new BehaviorSubject<any>(null);
  constructor(private securitySvc: SecurityAppService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!request.url.includes('Authenticate')) {
      // debugger;
      this.isRefreshing = true;
      const isValid = this.securitySvc.checkToken();
      const existToken = this.securitySvc.tokenApp;
      if (isValid === true && (existToken === null || existToken.length > 0)){
        this.securitySvc.refreshToken();
      }
      return next.handle(this.addToken(request, existToken));

      // return next.handle(request).pipe(catchError(error => {
      //   if (error instanceof HttpErrorResponse && error.status === 401){
      //     return this.handler401error(request, next);
      //   } else {
      //     return throwError(error);
      //   }
      // }));
    }
    return next.handle(request);
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // private handler401error(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
  //   debugger;
  //   if (!this.isRefreshing){
  //     this.isRefreshing = true;
  //     this.refreshToken$.next(null);

  //     // this.securitySvc.getAndSaveToken();
  //     const t = this.securitySvc.retriveToken();
  //     console.log('interceptor handler401error', t);
  //     this.refreshToken$.next(t);
  //     return next.handle(this.addToken(request, t));
  //   } else {
  //     return this.refreshToken$.pipe(
  //       filter(token => token != null),
  //       take(1),
  //       switchMap(jwt => {
  //         debugger;
  //         return next.handle(this.addToken(request, jwt));
  //       }));
  //   }
  // }
}
