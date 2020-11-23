// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const BASE_API_COBRANZA = 'http://192.168.0.3/InformesGestion/';
export const environment = {
  production: false,
  END_POINT: {
    AUTHENTICATE: `${BASE_API_COBRANZA}api/Login/Authenticate`,
    PRIMAS_IMPAGAS_CLIENTES_POR_AGENTE: `${BASE_API_COBRANZA}api/PolizasImpagas/ObtenerListaPolImpagasPorAgente?CodAgente=`
  }
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
