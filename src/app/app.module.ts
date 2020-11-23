import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MaterialModule } from '@app/materia-module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from '@app/app.component';
import { InformeCobranzaAgentesComponent } from '@components/informe-cobranza-agentes/informe-cobranza-agentes.component';
import { Error404Component } from '@components/error404/error404.component';
import { PageNotFoundComponent } from '@components/page-not-found/page-not-found.component';

import { HandlerHttpInterceptor } from '@interceptors/handler-http.interceptor';
import { ErrorInterceptor } from '@interceptors/error.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SelectSingleOptionComponent } from './shared/select-single-option/select-single-option.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginatorClp } from '@app/shared/componentes-custom/paginator-clp/custom-paginator-clp';
import { FilterItemDirective } from './directives/filter-item.directive';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    InformeCobranzaAgentesComponent,
    Error404Component,
    PageNotFoundComponent,
    SelectSingleOptionComponent,
    FilterItemDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: CustomPaginatorClp
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HandlerHttpInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
