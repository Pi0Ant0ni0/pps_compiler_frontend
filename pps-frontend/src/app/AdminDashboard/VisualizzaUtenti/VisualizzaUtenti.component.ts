import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from './../../Services/Admin.service';
import { GenericUser } from './../../API/GenericUser';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-VisualizzaUtenti',
  templateUrl: './VisualizzaUtenti.component.html',
  styleUrls: ['./VisualizzaUtenti.component.css']
})
export class VisualizzaUtentiComponent implements OnInit {

  utenti :GenericUser[] = [];
  displayedColumns: string[] = ['Nome', 'Cognome', 'Email', 'Ruolo', 'Matricola', 'Codice Corso Di Studio'];
  dataSource =new MatTableDataSource(this.utenti);
  ppsDetailed : boolean = false;


  constructor(private _adminService: AdminService,
    private _snack: MatSnackBar,
    public dialog: MatDialog,
    private _route: Router) {
    this._adminService.getUtenti().subscribe({
      next: (utenti: GenericUser[])=>{
        this.utenti=utenti;
        this.dataSource = new MatTableDataSource(this.utenti);
      },
      error: (err:string)=>this._openSnackBar(err),
    });
   }

   openDialogElimina(utente: GenericUser){
    this.dialog.open(DialogElimina).afterClosed().subscribe(result => {
      if(result){
        this._adminService.deleteUtente(utente.email).subscribe({
          next: (message: string)=> {
            this._openSnackBar(message);
            this._route.navigate(["adminDashboard"]).then(()=>this._route.navigate(["adminDashboard/utenti"]));
          },
          error: (message: string)=>this._openSnackBar(message),          
        })
      }
    });
  }

   applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
   }

   private _openSnackBar(message:string){
     this._snack.open(message,"close");
   }

  ngOnInit() {
  }

}

@Component({
  selector: 'dialogElimina',
  templateUrl: 'DialogElimina.html',
})
export class DialogElimina {}
