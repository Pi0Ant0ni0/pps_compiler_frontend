import { MatSnackBar } from '@angular/material/snack-bar';
import { PPSPreview } from './../../API/PPSPreview';
import { Component, OnInit } from '@angular/core';
import { DocenteService } from 'src/app/Services/Docente.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-PPSInSospeso',
  templateUrl: './PPSInSospeso.component.html',
  styleUrls: ['./PPSInSospeso.component.css']
})
export class PPSInSospesoComponent implements OnInit {
  ppsInSospeso :PPSPreview[] = [];
  displayedColumns: string[] = ['Nome', 'Cognome', 'Email', 'Data Di Compilazione','Codice Corso Di Studio'];
  dataSource =new MatTableDataSource(this.ppsInSospeso);
  ppsDetailed : boolean = false;

  visualizzaPPS(row: PPSPreview){
    this.ppsDetailed = true;
    this.route.navigate(["docenteDashboard/pps/ppsDettagliato"],{
      state: {
        pps: JSON.stringify(row),
      }
    });
  }

  constructor(private _docenteService: DocenteService, private _snack: MatSnackBar, private route : Router) {
    this._docenteService.getPPSInSospeso().subscribe({
      next: (pps: PPSPreview[])=>{
        this.ppsInSospeso=pps;
        this.dataSource = new MatTableDataSource(this.ppsInSospeso);
      },
      error: (err:string)=>this._openSnackBar(err),
    });
   }

   updateView(){
    this.route.navigate(["/docenteDashboard"]).then(()=>this.route.navigate(["/docenteDashboard/pps"]));
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
