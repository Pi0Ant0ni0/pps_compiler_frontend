import { DialogElimina, VisualizzaUtentiComponent } from './AdminDashboard/VisualizzaUtenti/VisualizzaUtenti.component';
import { AggiungiUtenteComponent } from './AdminDashboard/AggiungiUtente/AggiungiUtente.component';
import { PPSVisionatiComponent } from './DocenteDashboard/PPSVisionati/PPSVisionati.component';
import { PPSDettagliatoComponent, DialogAccetta, DialogRifiuta } from './DocenteDashboard/PPSInSospeso/PPSDettagliato/PPSDettagliato.component';
import { PPSInSospesoComponent } from './DocenteDashboard/PPSInSospeso/PPSInSospeso.component';
import { OrientamentoPPSComponent } from './StudenteDashboard/CompilaPPS/OrientamentoPPS/OrientamentoPPS.component';
import { VisualizzaPPSComponent } from './StudenteDashboard/VisualizzaPPS/VisualizzaPPS.component';
import { CompilaPPSComponent } from './StudenteDashboard/CompilaPPS/CompilaPPS.component';
import { InsegnamentiVincolatiDalCorsoDiStudioFormComponent } from './Regole/InsegnamentiVincolatiDalCorsoDiStudioForm/InsegnamentiVincolatiDalCorsoDiStudioForm.component';
import { OrientamentoFormComponent } from './Regole/OrientamentoForm/OrientamentoForm.component';
import { InsegnamentiFormComponent } from './Regole/InsegnamentiForm/InsegnamentiForm.component';
import { TokenInterceptor } from './util/TokenInterceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';  
import {MatButtonModule} from '@angular/material/button'; 
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list'; 
import { MatInputModule } from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSnackBarModule} from '@angular/material/snack-bar'; 
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import { DocenteDashboardComponent } from './DocenteDashboard/DocenteDashboard.component';
import { SadDashboardComponent } from './SadDashboard/SadDashboard.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon'; 
import {MatSidenavModule} from '@angular/material/sidenav'; 
import { ManifestiComponent } from './Manifesti/Manifesti.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { OrdinamentiComponent } from './Ordinamenti/Ordinamenti.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegoleComponent } from './Regole/Regole.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select'; 
import {MatExpansionModule} from '@angular/material/expansion'; 
import {MatTableModule} from '@angular/material/table'; 
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import { StudenteDashboardComponent } from './StudenteDashboard/StudenteDashboard.component';
import { InsegnamentiASceltaPPSComponent } from './StudenteDashboard/CompilaPPS/InsegnamentiASceltaPPS/InsegnamentiASceltaPPS.component';
import {MatListModule} from '@angular/material/list'; 
import {MatDialogModule} from '@angular/material/dialog'; 
import { AdminDashboardComponent } from './AdminDashboard/AdminDashboard.component';
import { InsegnamentiLiberiFormComponent } from './Regole/InsegnamentiLiberiForm/InsegnamentiLiberiForm.component';
  
  

@NgModule({
  declarations: [										
    AppComponent,
    LoginComponent,
    SadDashboardComponent,
    DocenteDashboardComponent,
    ManifestiComponent,
    OrdinamentiComponent,
    RegoleComponent,
    InsegnamentiFormComponent,
    OrientamentoFormComponent,
    InsegnamentiVincolatiDalCorsoDiStudioFormComponent,
    StudenteDashboardComponent,
    CompilaPPSComponent,
    VisualizzaPPSComponent,
    OrientamentoPPSComponent,
    InsegnamentiASceltaPPSComponent,
    PPSInSospesoComponent,
    PPSDettagliatoComponent,
    DialogAccetta,
    DialogRifiuta,
    PPSVisionatiComponent,
    AdminDashboardComponent,
    AggiungiUtenteComponent,
    VisualizzaUtentiComponent,
    DialogElimina,
    InsegnamentiLiberiFormComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatInputModule,
    MatTabsModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatSelectModule,
    MatExpansionModule,
    MatTableModule,
    MatCheckboxModule,
    CommonModule,
    MatListModule,
    MatDialogModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
