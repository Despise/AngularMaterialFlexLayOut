import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InformeCobranzaAgentesComponent } from '@components/informe-cobranza-agentes/informe-cobranza-agentes.component';
import { PageNotFoundComponent } from '@components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: PageNotFoundComponent },
  { path: 'informe-cobranza-agentes/:codAgente', component: InformeCobranzaAgentesComponent },
  { path: '**', pathMatch : 'full', redirectTo: 'error404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
