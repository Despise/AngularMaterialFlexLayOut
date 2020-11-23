import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment as env } from '@env/environment';
import { AuthApiCobranzas } from '@interfaces/auth-cobranzas/auth-api.interface';
import { AuthResponseToken } from '@interfaces/auth-cobranzas/auth-response-token.interface';

@Injectable({
  providedIn: 'root'
})
export class SecurityAppService {
  private credenciales = { Username: 'InformesDeGestion', Password: '1nf0rm3s_d3_g3st10n_D3S4' };
  private readonly httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })};
  private HELPER = new JwtHelperService();
  private isLoginToken$ = new BehaviorSubject<string>(null);


constructor(private http: HttpClient) {
  this.isLoginToken$ = new BehaviorSubject<string>(this.retriveToken());
}

get tokenApp(): string {
  return this.isLoginToken$.value;
}

  private getToken(credenciales: AuthApiCobranzas): Observable<AuthResponseToken> {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
    return this.http.post<AuthResponseToken>(env.END_POINT.AUTHENTICATE, credenciales, this.httpOptions)
                    .pipe(map(resp => {
                      return resp;
                    }));
  }

  refreshToken(): void {
    this.removeToken();
    this.getToken(this.credenciales)
        .subscribe((token: any) => {
        console.log(`refreshToken SECURITY -> ${token['Resultado'].Token}`);
        this.guardarToken(token['Resultado'].Token);
        return token;
      }, error => {
        console.log(`getToken -> subscribe => Ocurrio un error ->' ${ error }`);
      });
  }

  guardarToken(token: string): void {
    const expirationDate = this.HELPER.getTokenExpirationDate(token);
    sessionStorage.setItem('token_cobranzas', token);
    this.isLoginToken$.next(token);
    console.log(`Token NUEVO -> ${expirationDate}`);
  }

  checkToken(): boolean {
    const API_TOKEN = sessionStorage.getItem('token_cobranzas');
    const IS_EXPIRED = this.HELPER.isTokenExpired(API_TOKEN);
    console.log('Token is Invalid? -> ' + IS_EXPIRED);

    return IS_EXPIRED;
  }


  removeToken(): void {
    this.isLoginToken$.next(null);
    sessionStorage.removeItem('token_cobranzas');
    // this.router.navigate(['/page-not-found']);
  }

  retriveToken(): string {
    return sessionStorage.getItem('token_cobranzas');
  }

}
