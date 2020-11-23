import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select-single-option',
  template: `
  <mat-form-field appearance="fill">
  <mat-label>PÓLIZAS CRÍTICAS</mat-label>
    <mat-select [(value)]="selectedValue" (changeSelect)="busquedaPolizasCriticas($event.target.value)">
      <mat-option value="0">Todas las pólizas</mat-option>
      <mat-option value="1">Criticas</mat-option>
      <mat-option value="2">No Criticas</mat-option>
    </mat-select>
    </mat-form-field>
  `,
  styles: [
  ]
})
export class SelectSingleOptionComponent implements OnInit {

  selectedValue = '0';
  @Output() changeSelect = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  busquedaPolizasCriticas(e): void {
    console.log('LLEGO LA MERCA !');
  }


}
