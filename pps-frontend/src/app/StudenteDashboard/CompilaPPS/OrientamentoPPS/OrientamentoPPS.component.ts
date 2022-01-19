import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentService } from './../../../Services/Student.service';
import { Orientamento } from 'src/app/API/Orientamento';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { InsegnamentoRegola } from 'src/app/API/InsegnamentoRegola';
import { MatTable } from '@angular/material/table';
import { Form, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-OrientamentoPPS',
  templateUrl: './OrientamentoPPS.component.html',
  styleUrls: ['./OrientamentoPPS.component.css']
})
export class OrientamentoPPSComponent implements OnInit, OnChanges {

  @Output() addOrientamento: EventEmitter<InsegnamentoRegola[]> =   new EventEmitter();
  @Input() codiceCorsoDiStudio: string|undefined;
  @Input() coorte:number|undefined;
  displayedColumns: string[] = ['Denominazione Insegnamento', 'Codice Insegnamento', 'Settore', 'CFU', 'Semestre', 'Annuale', 'Integrato', 'Corso Di Studio Mutuo'];
  displayedColumnsAScelta: string[] = ['select','Denominazione Insegnamento', 'Codice Insegnamento', 'Settore', 'CFU', 'Semestre', 'Annuale', 'Integrato', 'Corso Di Studio Mutuo'];
  @ViewChild('tabellaObbligatori') tabellaObbligatori!: MatTable<InsegnamentoRegola>;
  orientamentiFormCtrl: FormGroup;
  orientamenti : Orientamento[] = [];
  orientamentiTabella: InsegnamentoRegola[] = [];
  insegnamentiAScelta: InsegnamentoRegola[] = [];
  cfuAScelta: number =0;
  insegnamentiLiberiScelti: InsegnamentoRegola[] =[];
  selection = new SelectionModel<InsegnamentoRegola>(true, []);
  cfuSelezionati =0;
  @Output() valid:EventEmitter<boolean> =   new EventEmitter();
  @Output() thereIsOrientamento:EventEmitter<boolean> =   new EventEmitter();

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.insegnamentiAScelta.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.insegnamentiAScelta);
  }

  private _openSnackBar(message:string){
    this._snack.open(message,"close");
  }


  constructor(private _studentService:StudentService, private _formBuilder: FormBuilder, private _snack: MatSnackBar) {
    this.orientamentiFormCtrl = this._formBuilder.group({
      orientamentoCtrl:[Validators.required],
      cfuCtrl:[Validators.required],
    });

    this.orientamentiFormCtrl.get("orientamentoCtrl")?.valueChanges.subscribe({
      next: (orientamento: Orientamento)=>{
        this.orientamentiTabella = orientamento.insegnamentiVincolati;
        this.insegnamentiAScelta = orientamento.insegnamentiLiberi == undefined? []: orientamento.insegnamentiLiberi;
        this.cfuAScelta = orientamento.quotaCFULiberi;
        this.cfuSelezionati=0;
        this._checkValid();
      },
    });

    this.selection.changed.subscribe({
      next: ()=>{
        this.cfuSelezionati=0;
        this.insegnamentiLiberiScelti = this.selection.selected;
        for(let i =0; i<this.insegnamentiLiberiScelti.length; i++){
          this.cfuSelezionati += this.insegnamentiLiberiScelti[i].cfu;
        }
        this._checkValid();
      },
    });
  }

  private _checkValid(){
    if(this.cfuAScelta != this.cfuSelezionati){
      this.valid.emit(false);
    }else{
      this.valid.emit(true);
      this.addOrientamento.emit(this.orientamentiTabella.concat(this.insegnamentiLiberiScelti));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.codiceCorsoDiStudio && this.coorte && this.coorte.toLocaleString().length>=4){
      console.log(this.coorte);
      console.log(this.codiceCorsoDiStudio);
      this._studentService.getOrientamenti(this.coorte,this.codiceCorsoDiStudio).subscribe({
        next: (orientamenti: Orientamento[]) => {
          this.orientamenti = orientamenti;
          if(this.orientamenti.length>0){
            this.thereIsOrientamento.emit(true);
          }else{
            this.thereIsOrientamento.emit(false);
          }
        },
        error:(message:string)=>this._openSnackBar(message),
      });
    }
  }


  ngOnInit() {
  }

}
