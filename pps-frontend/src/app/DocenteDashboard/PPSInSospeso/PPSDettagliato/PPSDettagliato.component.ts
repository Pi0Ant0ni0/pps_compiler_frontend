import { MatSnackBar } from '@angular/material/snack-bar';
import { DocenteService } from 'src/app/Services/Docente.service';
import { AttivitaDidatticaDettagliata } from '../../../API/AttivitaDidatticaDettagliata';
import { PPSPreview } from './../../../API/PPSPreview';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-PPSDettagliato',
  templateUrl: './PPSDettagliato.component.html',
  styleUrls: ['./PPSDettagliato.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PPSDettagliatoComponent implements OnInit {

  pps: PPSPreview;
  displayedColumns: string[] = ['Denominazione Insegnamento', 'Codice Insegnamento', 'Settore', 'CFU'];
  expandedElement: AttivitaDidatticaDettagliata | undefined;
  @Output() updateView : EventEmitter<any> = new EventEmitter();

  constructor(private _router: Router, private _docenteService: DocenteService, private _snack:MatSnackBar, public dialog: MatDialog) {
    const routeState = this._router.getCurrentNavigation()!.extras.state;
    this.pps = JSON.parse(routeState!['pps']) ;
  }

  openDialogAccetta(){
    this.dialog.open(DialogAccetta).afterClosed().subscribe(result => {
      if(result){
        this._approvaPPS();
      }
    });
  }

  openDialogRifiuta(){
    this.dialog.open(DialogRifiuta).afterClosed().subscribe(result => {
      if(result){
        this._rifiutaPPS();
      }
    });
  }

  private _openSnackBar(message:string){
    this._snack.open(message,"close");
  }

  goBack(){
    this._router.navigate(["/docenteDashboard/pps"]);
    this.updateView.emit();
  }

  private _approvaPPS(){
    this._docenteService.approvaPPS(this.pps).subscribe({
      next:(message:string)=>{
        this._openSnackBar(message);
        this.goBack();
      },
      error: (message:string)=> this._openSnackBar(message),
    });
  }

  private _rifiutaPPS(){
    this._docenteService.rifiutaPPS(this.pps).subscribe({
      next:(message:string)=>{
        this._openSnackBar(message);
        this.goBack();
      },
      error: (message:string)=> this._openSnackBar(message),
    });
  }

  openPPSPDF(email: string){
    this._docenteService.getPPSPDF(email).subscribe({
      next: (data: Blob) => {
        var file = new Blob([data], { type: 'application/pdf' })
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL, "_blank");
      }
    });
  }

  ngOnInit() {
  }

}

@Component({
  selector: 'dialogAccetta',
  templateUrl: 'DialogAccetta.html',
})
export class DialogAccetta {}

@Component({
  selector: 'dialogRifiuta',
  templateUrl: 'DialogRifiuta.html',
})
export class DialogRifiuta {}

