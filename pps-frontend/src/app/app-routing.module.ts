import { VisualizzaUtentiComponent } from './AdminDashboard/VisualizzaUtenti/VisualizzaUtenti.component';
import { AggiungiUtenteComponent } from './AdminDashboard/AggiungiUtente/AggiungiUtente.component';
import { AdminDashboardComponent } from './AdminDashboard/AdminDashboard.component';
import { PPSVisionatiComponent } from './DocenteDashboard/PPSVisionati/PPSVisionati.component';
import { PPSDettagliatoComponent } from './DocenteDashboard/PPSInSospeso/PPSDettagliato/PPSDettagliato.component';
import { PPSInSospesoComponent } from './DocenteDashboard/PPSInSospeso/PPSInSospeso.component';
import { VisualizzaPPSComponent } from './StudenteDashboard/VisualizzaPPS/VisualizzaPPS.component';
import { CompilaPPSComponent } from './StudenteDashboard/CompilaPPS/CompilaPPS.component';
import { RegoleComponent } from './Regole/Regole.component';
import { ManifestiComponent } from './Manifesti/Manifesti.component';
import { AuthGuard } from './util/AuthGuard';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SadDashboardComponent } from './SadDashboard/SadDashboard.component';
import { Roles } from './API/Roles.enum';
import { OrdinamentiComponent } from './Ordinamenti/Ordinamenti.component';
import { StudenteDashboardComponent } from './StudenteDashboard/StudenteDashboard.component';
import { DocenteDashboardComponent } from './DocenteDashboard/DocenteDashboard.component';


const routes: Routes = [
  {
  path: 'login',
  component: LoginComponent
},
{
  path: 'sadDashboard',
  component: SadDashboardComponent,
  canActivate: [AuthGuard],
  data: { role: Roles.SAD },
  children: [
    {
      path: 'manifesti',
      component: ManifestiComponent,
      canActivate: [AuthGuard],
      data: { role: Roles.SAD}
    },
    {
      path: 'ordinamenti',
      component: OrdinamentiComponent,
      canActivate: [AuthGuard],
      data: { role: Roles.SAD}
    },
    {
      path: 'regole',
      component: RegoleComponent,
      canActivate: [AuthGuard],
      data: { role: Roles.SAD}
    }
  ]
},
{
  path: 'studenteDashboard',
  component: StudenteDashboardComponent,
  canActivate: [AuthGuard],
  data: { role: Roles.STUDENTE },
  children: [
    {
      path: 'compilaPPS',
      component: CompilaPPSComponent,
      canActivate: [AuthGuard],
      data: { role: Roles.STUDENTE}
    },
    {
      path: 'visualizzaPPS',
      component: VisualizzaPPSComponent,
      canActivate: [AuthGuard],
      data: { role: Roles.STUDENTE}
    }
  ]
},
{
  path: 'docenteDashboard',
  component: DocenteDashboardComponent,
  canActivate: [AuthGuard],
  data: { role: Roles.DOCENTE },
  children: [
    {
      path: 'pps',
      component: PPSInSospesoComponent,
      canActivate: [AuthGuard],
      data: { role: Roles.DOCENTE},
      children: [
        {
          path: 'ppsDettagliato',
          component: PPSDettagliatoComponent,
          canActivate: [AuthGuard],
          data: { role: Roles.DOCENTE}
        }
      ]
    },
    {
      path: 'ppsVisionati',
      component: PPSVisionatiComponent,
      canActivate: [AuthGuard],
      data: { role: Roles.DOCENTE}
    }
  ]
},
{
  path: 'adminDashboard',
  component: AdminDashboardComponent,
  canActivate: [AuthGuard],
  data: { role: Roles.ADMIN },
  children:[
    {
      path: 'aggiungiUtente',
      component: AggiungiUtenteComponent,
      canActivate: [AuthGuard],
      data: {role: Roles.ADMIN}
    },
    {
      path: 'utenti',
      component: VisualizzaUtentiComponent,
      canActivate: [AuthGuard],
      data: {role: Roles.ADMIN}
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
