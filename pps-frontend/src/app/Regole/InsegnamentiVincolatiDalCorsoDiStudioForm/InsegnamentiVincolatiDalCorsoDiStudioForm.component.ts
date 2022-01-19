import { AttivitaDidatticheVincolateDalCorsoDiStudio } from '../../API/AttivitaDidatticheVincolateDalCorsoDiStudio';
import { SadService } from './../../Services/sad.service';
import { Component, OnInit, Output, ViewChild, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MatTable } from '@angular/material/table';
import { CorsoDiStudio } from 'src/app/API/CorsoDiStudio';
import { InsegnamentoRegola } from 'src/app/API/InsegnamentoRegola';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-InsegnamentiVincolatiDalCorsoDiStudioForm',
  templateUrl: './InsegnamentiVincolatiDalCorsoDiStudioForm.component.html',
  styleUrls: ['./InsegnamentiVincolatiDalCorsoDiStudioForm.component.css']
})
export class InsegnamentiVincolatiDalCorsoDiStudioFormComponent implements OnInit {
  insegnamentiVincolatiDalCorsoPreliminareForm: FormGroup;
  @ViewChild('tabellaInsegnamentiVincolatiDalCorsoPreliminare') tabellaInsegnamentiVincolatiDalCorsoPreliminare! : MatTable<AttivitaDidatticheVincolateDalCorsoDiStudio> ;
  @ViewChild('stepperInsegnamentiVincolatiDalCorso') stepperInsegnamentiVincolatiDalCorso! : MatStepper ;
  displayedInsegnamentiVincolatiDalCorsoColumns: string[] = ['Corso Di Studio Vincolante','CFU Da Scegliere'];
  vincolatiDalCorsoDiStudioTabella: AttivitaDidatticheVincolateDalCorsoDiStudio[] = [];
  insegnamentiVincolatiDalCorsoDiStudioTabella: InsegnamentoRegola[] = [];
  corsiDiStudio : CorsoDiStudio[] = []
  @Output() newVincolato = new EventEmitter<AttivitaDidatticheVincolateDalCorsoDiStudio>();
  @Output() removeVincolato = new EventEmitter<any>();
  @ViewChild(FormGroupDirective) form! :FormGroupDirective;
  aggiornaTabella: Subject<void> = new Subject<void>();
  @Input() codiceCorsoDiStudio!:string;

  

  addVincolatoDalCorso(){
    const vincolato = {
      insegnamentiRegola:this.insegnamentiVincolatiDalCorsoDiStudioTabella,
      corsoDiStudioVincolante :this.insegnamentiVincolatiDalCorsoPreliminareForm.get("corsiDiStudioCtrl")?.value.codice,
      numeroCfuDaScegliere: this.insegnamentiVincolatiDalCorsoPreliminareForm.get("cfuDaScegliereCtrl")?.value,
    }
    this.vincolatiDalCorsoDiStudioTabella.push(vincolato);
    this.tabellaInsegnamentiVincolatiDalCorsoPreliminare?.renderRows();
    this.stepperInsegnamentiVincolatiDalCorso?.reset();
    this.newVincolato.emit(vincolato);
    this.insegnamentiVincolatiDalCorsoDiStudioTabella = [];
    this.stepperInsegnamentiVincolatiDalCorso.reset();
    this.form.resetForm();
    this.aggiornaTabella.next();
  }

  removeVincolatoDalCorso(){
    this.vincolatiDalCorsoDiStudioTabella.pop();
    this.removeVincolato.emit();
  }

  addInsegnamentoVincolato(insegnamento: InsegnamentoRegola){
    this.insegnamentiVincolatiDalCorsoDiStudioTabella.push(insegnamento);
  }

  removeInsegnamentoVincolato(){
    this.insegnamentiVincolatiDalCorsoDiStudioTabella.pop();
  }


  constructor(private _formBuilder: FormBuilder, private sadService :SadService) {
    this.insegnamentiVincolatiDalCorsoPreliminareForm = this._formBuilder.group({
      corsiDiStudioCtrl: ['', Validators.required],
      cfuDaScegliereCtrl: ['', Validators.required],
    });
    this.sadService.getCorsiDiStudio().subscribe({
      next: (corsiDiStudio : CorsoDiStudio[]) =>{this.corsiDiStudio = corsiDiStudio;},
    });
  }

  ngOnInit() {
  }

}
