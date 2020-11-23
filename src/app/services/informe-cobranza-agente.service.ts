import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InformeCobranzaAgenteService {

  constructor(private cobranza: HttpClient) { }

  getPrimasImpagasAgente(codAgente: string): Observable <any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }),
    };
    console.log('getPrimasImpagasAgente service cobranza');
    return this.cobranza.get(env.END_POINT.PRIMAS_IMPAGAS_CLIENTES_POR_AGENTE + codAgente, httpOptions)
      .pipe(
          map( (clientes) => {
         //   debugger;
         //   console.log('getPrimasImpagasAgente dentro del map -> ', clientes['resultado']);
            return clientes['resultado'];
          }), retry(1)
      );
  }
}
