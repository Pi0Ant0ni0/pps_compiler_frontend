import { MatSnackBar } from '@angular/material/snack-bar';
import { DocenteService } from './../../Services/Docente.service';
import { PPSPreview } from './../../API/PPSPreview';
import { AuthService } from './../../Services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-VisualizzaPPS',
  templateUrl: './VisualizzaPPS.component.html',
  styleUrls: ['./VisualizzaPPS.component.css']
})
export class VisualizzaPPSComponent implements OnInit {
  
  private _email:string;
  pps: PPSPreview |undefined;
  color = "#cbae34";

  public openPPSPDf(email:string){
    this._docenteService.getPPSPDF(email).subscribe({
      next: (data: Blob) => {
        var file = new Blob([data], { type: 'application/pdf' })
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL, "_blank");
      }
    });

  }

  constructor(private _auth: AuthService, private _docenteService :DocenteService, private _snack: MatSnackBar) { 
    this._email= this._auth.getUser().email;
    this._docenteService.getPPSCompleto(this._email).subscribe({
      next:(pps: PPSPreview) => {
        this.pps = pps;
        if(pps.approvato){
          this.color="green";
        }else{
          if(pps.rifiutato){
            this.color="#690120";
          }
        }
      },
      error:(err:string) => this._openSnackBar(err)
    });
  }


  private _openSnackBar(err: string): void {
   this._snack.open(err,"close");
  }

  ngOnInit() {
  }

}
