export interface PolizasImpagasClientes{
  resultado: PolizaImpaga[];
}

export interface PolizaImpaga {
  idNumPoliza: number;
  codSerie: string;
  codPlan: number;
  descPlan: string;
  rutCliente: number;
  dvCliente: string;
  nombresCliente: string;
  apellidosCliente: string;
  emailPrincipalCliente: string;
  telefonoPrincipalCliente: string;
  direccionCliente: string;
  mesesImpago: number;
  codPeriodicidad: string;
  descPeriodicidad: string;
  mtoPrima: number;
  codMoneda: number;
  descMoneda: string;
  SaldoMO: string;
  idNumeroCuenta: number;
  IndicadorPolizaCritica: string;
  codEstadoMigra: number;
  descEstadoMigra: string;
}

export interface ListCliImpagos {
  nombresCli: string;
  rutCliente: string;
  telefonoPrincipalCli: string;
  emailPrincipalCli: string;
  direccionP: string;
  descPlan: string;
  poliza: string;
  IndicadorPolizaCritica: string;
  mesesImpago: number;
  descPeriodicidad: string;
  mtoPrima: number;
  idNumeroCuenta: number;
  SaldoMO: string;
}
