import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { InformeCobranzaAgenteService } from '@services/informe-cobranza-agente.service';
import { ListCliImpagos, PolizaImpaga } from '@entities/cobranzas/primas-impagas-clientes.interface';
import { BehaviorSubject } from 'rxjs';
import { MatSelect } from '@angular/material/select';



@Component({
  selector: 'app-informe-cobranza-agentes',
  templateUrl: './informe-cobranza-agentes.component.html',
  styleUrls: ['./informe-cobranza-agentes.component.scss']
})
export class InformeCobranzaAgentesComponent implements OnInit, AfterViewInit {
  datosTabla = new BehaviorSubject<ListCliImpagos[]>(null);
  datosCol = new BehaviorSubject<string[]>([]);
  // displayedColumns: string[] = [
  //   'nombresCliente',
  //   'rutCliente',
  //   'telefonoPrincipalCliente',
  //   'emailPrincipalCliente',
  //   'direccionP',
  //   'descPlan',
  //   'poliza',
  //   'IndicadorPolizaCritica',
  //   'mesesImpago',
  //   'descPeriodicidad',
  //   'mtoPrima',
  //   'idNumeroCuenta',
  //   'SaldoMO',
  //   'acciones'
  // ];


  private listaCondiciones = [
    // { value: 'nono', label: 'Nono' },
    // { value: 'is-empty', label: 'Is empty' },
    // { value: 'is-not-empty', label: 'Is not empty' },
    { value: 'es-igual', label: 'Es igual' },
    // { value: 'is-not-equal', label: 'Is not equal' }
    { value: 'contiene', label: 'Contiene' }
  ];

  private funcionCondiciones = // { // search method base on conditions list value
    // 'is-empty': function (value, filterdValue) {
    //   return value === '';
    // },
    // 'is-not-empty': function (value, filterdValue) {
    //   return value !== '';
    // },
    // 'is-equal': function (value, filterdValue) {
    //   return value === filterdValue;
    // },
    // 'is-not-equal': function (value, filterdValue) {
    //   return value !== filterdValue;
    // }
    {
      'es-igual': (value: string, filterdValue: string) => {
      return value === filterdValue;
    },
      'contiene': (value: string, filterdValue: string) => {
        return value.includes(filterdValue);
    }
  };

  displayedColumns: string[] = [
    'nombresCliente',
    'rutCliente',
    'telefonoPrincipalCliente',
    'emailPrincipalCliente',
    'direccionP',
    'poliza',
    'mesesImpago',
    'acciones'
  ];

  public listaClientesImpagos: ListCliImpagos[] = [];
  public dataSource = new MatTableDataSource();
  public conditionsList = this.listaCondiciones;
  public searchValue: any = {};
  public searchCondition: any = {};
  private _filterMethods = this.funcionCondiciones;

  busquedaValor = '';
  selectedCriticas = '';
  selectedProd = '';
  isLoadingResults = true;

  public productos: string[] = [];


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('selectProductos')selectProductos: MatSelect;
  @ViewChild('selectCriticas')selectCriticas: MatSelect;
  @Output()selectionChange = new EventEmitter<any>();

  constructor(
    private cobranzaSvc: InformeCobranzaAgenteService,
    private activatedRouter: ActivatedRoute
  ) { }

  ngAfterViewInit(): void {

    /**
     * filtro por select polizas criticas
     */
    // this.dataSource.filterPredicate = (data: {IndicadorPolizaCritica: string}, filterValue: string) =>
    //     data.IndicadorPolizaCritica.trim().toLowerCase().indexOf(filterValue) !== -1;


    /**
     * busqueda por filtro columna
     */
    // this.dataSource.filterPredicate = (p: ListCliImpagos, filtre: any) => {
    //   debugger;
    //   let result = true;
    //   let keys = Object.keys(p); // keys of the object data 

    //   for (const key of keys) {
    //     let searchCondition = filtre.conditions[key]; // get search filter method

    //     if (searchCondition && searchCondition !== 'none') {
    //       if (filtre.methods[searchCondition](p[key], filtre.values[key]) === false) { // invoke search filter 
    //         result = false // if one of the filters method not succeed the row will be remove from the filter result 
    //         break;
    //       }
    //     }
    //   }

    //   return result;
    // };



    this.dataSource.paginator = this.paginator;

  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.activatedRouter.params.subscribe((params) => {
      this.getPrimasImpagasAgente(params.codAgente);
    });
  }

  // busqueda(event: Event): void {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  filtroBusqueda(eventValue: string, indicador: string): void {
    debugger;
    if (indicador === 'indicador-poliza') {
      if(eventValue === 'TODAS'){
        this.dataSource.data = this.listaClientesImpagos;
      }else {
        this.dataSource.data = this.listaClientesImpagos.slice().filter(
          (element) => JSON.stringify(element.IndicadorPolizaCritica).indexOf(eventValue) !== -1
        );
      }
    }else if (indicador === 'general'){
      this.dataSource.filter = eventValue.trim().toLowerCase();

  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
    } else if (indicador === 'producto') {
      if(eventValue === 'TODOS'){
        this.dataSource.data = this.listaClientesImpagos;
      } else {
        this.dataSource.data = this.listaClientesImpagos.slice().filter(
          (element) => JSON.stringify(element.descPlan).indexOf(eventValue) !== -1
        );
      }
    } else {
      this.dataSource.filter = eventValue.trim().toLowerCase();

    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  limpiarFiltros(): void{
    this.busquedaValor = '';
    this.selectProductos.value = '';
    this.selectCriticas.value = '';
    this.dataSource.data = this.listaClientesImpagos;
    this.dataSource.filter = '';
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filtroColumna(): void {
    debugger;


    // let searchFilter: any = {
    //   values: this.searchValue,
    //   conditions: this.searchCondition,
    //   methods: this._filterMethods
    // }

    // this.dataSource.filter = searchFilter;
  }

  limpiarColumn(columnKey: string): void {
    this.searchValue[columnKey] = null;
    this.searchCondition[columnKey] = 'none';
    this.filtroColumna();
  }


  getPrimasImpagasAgente(codAgente: string): void {
    let listaClientesImpagos: any = {};
    this.cobranzaSvc.getPrimasImpagasAgente(codAgente).subscribe((list: PolizaImpaga[]) => {
      list.forEach( (cli: PolizaImpaga) => {
        listaClientesImpagos.nombresCli = this.getFullNombre(cli.nombresCliente, cli.apellidosCliente);
        listaClientesImpagos.rutCliente = `${ cli.rutCliente }-${ cli.dvCliente }`;
        listaClientesImpagos.telefonoPrincipalCli = cli.telefonoPrincipalCliente;
        listaClientesImpagos.emailPrincipalCli = cli.emailPrincipalCliente.toUpperCase();
        listaClientesImpagos.direccionP = cli.direccionCliente;
        listaClientesImpagos.descPlan = cli.descPlan;
        listaClientesImpagos.poliza = `${ cli.codSerie }-${ cli.idNumPoliza }`;
        listaClientesImpagos.IndicadorPolizaCritica = cli.IndicadorPolizaCritica;
        listaClientesImpagos.mesesImpago = cli.mesesImpago;
        listaClientesImpagos.descPeriodicidad = cli.descPeriodicidad;
        listaClientesImpagos.mtoPrima = cli.mtoPrima;
        listaClientesImpagos.idNumeroCuenta = cli.idNumeroCuenta;
        listaClientesImpagos.SaldoMO = cli.SaldoMO;
        this.listaClientesImpagos.push(listaClientesImpagos);
        listaClientesImpagos = {};
      });
      this.dataSource.data = this.listaClientesImpagos;
      this.isLoadingResults = this.listaClientesImpagos.length > 0 ? false : true;
      this.listaClientesImpagos.forEach((col) => this.productos.push(col.descPlan));
      const productosSort = [...new Set(this.productos)].sort();
      this.productos.splice(0);
      this.productos = [...productosSort];
    });
  }

  getFullNombre(nom: string, ape: string): string {
    const nombres: string = nom;
    const apellidos: string = ape;
    return nombres + ' ' + apellidos;
  }

  // getFullDireccion(nombreCalle: string, numero: string, depto: string, comuna: string, ciudad: string): string {
  //   const _nombreCalle: string = nombreCalle;
  //   const _numero: string = numero;
  //   const _depto: string = (depto === null) ? '' : depto;
  //   const _comuna: string = comuna;
  //   const _ciudad: string = ciudad;
  //   return (
  //     _nombreCalle + ' ' + _numero + ' ' + _depto + ' ' + _comuna + ' ' + _ciudad
  //   );
  // }


}
