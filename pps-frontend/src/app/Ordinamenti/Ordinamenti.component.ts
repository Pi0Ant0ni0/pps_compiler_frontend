import { SadService } from './../Services/sad.service';
import { Ordinamento } from './../API/Ordinamento';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CorsoDiStudio } from '../API/CorsoDiStudio';
import { Form, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-Ordinamenti',
  templateUrl: './Ordinamenti.component.html',
  styleUrls: ['./Ordinamenti.component.css']
})
export class OrdinamentiComponent implements OnInit {

  public ordinamento: Ordinamento;
  public corsiDiStudio : CorsoDiStudio[] = []
  


  addOrdinamento(){
    this.sad.addOrdinamenti(this.ordinamento).subscribe({
      next:(message : string)=>{
        this._openSnackBar(message);
        this.ordinamento = {
          annoDiRedazione : String(new Date().getFullYear()),
          cfuMinimiOrientamento: '',
          cfuMassimiOrientamento: '',
          cfuMinimiAScelta: '',
          cfuMassimiAScelta: '',
          cfuMinimiObbligatori: '',
          cfuMassimiObbligatori: '',
          codiceCorso:''
        };
      },
      error: (err: string)=>{
        this._openSnackBar(err);
      }
    });

  }
  setCodice(codice: string){
   this.ordinamento.codiceCorso=codice;
  }

  private _openSnackBar(message: string) {
    this.snackBar.open(message, 'close');
  }

  constructor(private sad: SadService, private snackBar: MatSnackBar) {
    this.ordinamento = {
      annoDiRedazione : String(new Date().getFullYear()),
      cfuMinimiOrientamento: '',
      cfuMassimiOrientamento: '',
      cfuMinimiAScelta: '',
      cfuMassimiAScelta: '',
      cfuMinimiObbligatori: '',
      cfuMassimiObbligatori: '',
      codiceCorso:''
    };

    this.sad.getCorsiDiStudio().subscribe({
      next: (corsiDiStudio : CorsoDiStudio[]) =>{this.corsiDiStudio = corsiDiStudio;},
      error: (err)=>{this._openSnackBar(err);}
    });

   }

  ngOnInit() {
  }

}
