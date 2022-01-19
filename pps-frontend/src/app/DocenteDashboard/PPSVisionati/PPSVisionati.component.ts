import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PPSPreview } from 'src/app/API/PPSPreview';
import { DocenteService } from 'src/app/Services/Docente.service';

@Component({
  selector: 'app-PPSVisionati',
  templateUrl: './PPSVisionati.component.html',
  styleUrls: ['./PPSVisionati.component.css']
})
export class PPSVisionatiComponent implements OnInit {

  ppsInSospeso :PPSPreview[] = [];
  displayedColumns: string[] = ['Nome', 'Cognome', 'Email', 'Data Di Compilazione'];
  dataSource =new MatTableDataSource(this.ppsInSospeso);
  ppsDetailed : boolean = false;

  visualizzaPPS(row: PPSPreview){
    this._docenteService.getPPSPDF(row.email).subscribe({
      next: (data: Blob) => {
        var file = new Blob([data], { type: 'application/pdf' })
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL, "_blank");
      }
    });
  }

  constructor(private _docenteService: DocenteService, private _snack: MatSnackBar, private route : Router) {
    this._docenteService.getPPSVisionati().subscribe({
      next: (pps: PPSPreview[])=>{
        this.ppsInSospeso=pps;
        this.dataSource = new MatTableDataSource(this.ppsInSospeso);
      },
      error: (err:string)=>this._openSnackBar(err),
    });
   }

   updateView(){
    this.route.navigate(["/docenteDashboard"]).then(()=>this.route.navigate(["/docenteDashboard/ppsVisionati"]));
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
