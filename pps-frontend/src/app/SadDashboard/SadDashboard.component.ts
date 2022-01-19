import { CorsoDiStudio } from './../API/CorsoDiStudio';
import { SadService } from './../Services/sad.service';
import { AuthService } from './../Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../API/User';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-SadDashboard',
  templateUrl: './SadDashboard.component.html',
  styleUrls: ['./SadDashboard.component.css']
})
export class SadDashboardComponent implements OnInit {

  public sad : User;
  private aggiornamentoAvviato:  boolean;


  updateDataBase(){
    if(!this.aggiornamentoAvviato){
      this.openSnackBar('La procedura di aggiornamento del database richiede del tempo, ti avviseremo quando sarà terminata')
      this.sadService.updateDB().subscribe({
        next: (message: string)=>{
          this.openSnackBar(message)
        this.aggiornamentoAvviato=false;
        },
        error: (err: string)=>{this.openSnackBar(err)}
      });
    }else{
      this.openSnackBar('Hai gia avviato una procedura di aggiornamento del database, aspetta che termini!');
    }
  }

  logout(){
    this.auth.logout();
  }
  


  constructor(private auth: AuthService, private sadService : SadService, private snackBar: MatSnackBar) { 
    this.sad = this.auth.getUser();
    this.aggiornamentoAvviato = false;
    
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'close');
  }

  ngOnInit() {
  }

}
