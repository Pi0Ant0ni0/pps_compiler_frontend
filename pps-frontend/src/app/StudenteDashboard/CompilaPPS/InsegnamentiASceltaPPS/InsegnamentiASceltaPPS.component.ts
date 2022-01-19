import { StudentService } from './../../../Services/Student.service';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';
import { map, Observable, startWith } from 'rxjs';
import { AttivitaDidattica } from 'src/app/API/AttivitaDidattica';
import { InsegnamentoRegola } from 'src/app/API/InsegnamentoRegola';

@Component({
  selector: 'app-InsegnamentiASceltaPPS',
  templateUrl: './InsegnamentiASceltaPPS.component.html',
  styleUrls: ['./InsegnamentiASceltaPPS.component.css']
})
export class InsegnamentiASceltaPPSComponent implements OnInit, OnChanges {
  insegnamentiAutoComplete : AttivitaDidattica[] = [];
  filteredInsegnamentiObbligatori : Observable<AttivitaDidattica[]>
  insegnamentiASceltaForm: FormGroup;
  insegnamentiTabella: AttivitaDidattica[] = [];
  displayedColumns: string[] = ['Denominazione Insegnamento', 'Codice Insegnamento', 'Settore', 'CFU'];
  @ViewChild('tabellaAScelta') tabellaAScelta!: MatTable<AttivitaDidattica>;
  @Output() newInsegnamento: EventEmitter<AttivitaDidattica> =   new EventEmitter();
  @Output() removeInsegnamento: EventEmitter<any> =   new EventEmitter();
  @Input() codiceCorsoDiStudio!: string|undefined;
  @Input() coorte!:number|undefined;
  @ViewChild(FormGroupDirective) form! :FormGroupDirective;


  getDenominazioneInsegnamento(insegnamento : AttivitaDidattica){
    if(insegnamento){
      return insegnamento.denominazioneAttivitaDidattica;
    }else{
      return '';
    }
  }

  selectedInsegnamentoObbligatorio(evento : MatAutocompleteSelectedEvent){
    const insegnamento =evento.option.value;
    this.insegnamentiASceltaForm.patchValue({
        CodiceInsegnamentoCtrl: insegnamento.codiceAttivitaDidattica,
        SettoreScientificoDisciplinareCtrl : insegnamento.settoreScientificoDisciplinare,
        CFUCtrl: insegnamento.cfu
    });
  }

  addInsegnamentoAScelta(){
    const insegnamentoSelezionato = this.insegnamentiASceltaForm.get('DenominazioneInsegnamentoCtrl')?.value;
    this.insegnamentiTabella.push(insegnamentoSelezionato);
    this.tabellaAScelta?.renderRows();
    this.form.resetForm();
    this.newInsegnamento.emit(insegnamentoSelezionato);
  }

  removeInsegnamentoAScelta(){
    this.insegnamentiTabella.pop();
    this.tabellaAScelta?.renderRows();
    this.removeInsegnamento.emit();
  }
  
  private _filterInsegnamenti(value: string): AttivitaDidattica[] {
    const filterValue = value.toLowerCase();
    return this.insegnamentiAutoComplete.filter(
      (insegnamento) => insegnamento.denominazioneAttivitaDidattica.toLowerCase().includes(filterValue)
    );
  }

  constructor(private _formBuilder: FormBuilder, private _studentService : StudentService) { 
    this.insegnamentiASceltaForm = this._formBuilder.group({
      DenominazioneInsegnamentoCtrl: ['', Validators.required],
      CodiceInsegnamentoCtrl: ['', Validators.required],
      SettoreScientificoDisciplinareCtrl: ['', Validators.required],
      CFUCtrl:['',Validators.required],
    });


    //autocomplete
    this.filteredInsegnamentiObbligatori = this.insegnamentiASceltaForm.get('DenominazioneInsegnamentoCtrl')!.valueChanges.pipe(
      startWith(''),
      map(insegnamento => {
        if(typeof(insegnamento)== 'string'){
          return (insegnamento ? this._filterInsegnamenti(insegnamento) : this.insegnamentiAutoComplete.slice())
        }
        return (insegnamento ? this._filterInsegnamenti(insegnamento.denominazioneAttivitaDidattica) : this.insegnamentiAutoComplete.slice()); 
        
      })
    );
  }

  ngOnChanges(changes:SimpleChanges){
    if(this.codiceCorsoDiStudio && this.coorte){
      this._studentService.getInsegnamentiAScelta(this.coorte,this.codiceCorsoDiStudio).subscribe({
        next: (insegnamenti: AttivitaDidattica[]) => {
         this.insegnamentiAutoComplete= insegnamenti;
        },
      });
    }
  }

  ngOnInit() {
  }

}
