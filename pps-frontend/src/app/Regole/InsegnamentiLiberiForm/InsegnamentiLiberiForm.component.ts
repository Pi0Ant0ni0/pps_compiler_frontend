import { AttivitaDidattica } from './../../API/AttivitaDidattica';
import { CorsoDiStudio } from './../../API/CorsoDiStudio';
import { SadService } from '../../Services/sad.service';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { InsegnamentoRegola } from 'src/app/API/InsegnamentoRegola';

@Component({
  selector: 'app-InsegnamentiLiberiForm',
  templateUrl: './InsegnamentiLiberiForm.component.html',
  styleUrls: ['./InsegnamentiLiberiForm.component.css']
})
export class InsegnamentiLiberiFormComponent implements OnInit {
  insegnamentiAutoComplete : AttivitaDidattica[] = [];
  filteredInsegnamenti : Observable<AttivitaDidattica[]>
  insegnamentiForm: FormGroup;
  insegnamentiTabella: AttivitaDidattica[] = [];
  displayedColumns: string[] = ['Denominazione Insegnamento', 'Codice Insegnamento', 'Settore', 'CFU', 'Codice Corso Di Studio', 'Corso Di Studio'];
  @ViewChild('tabella') tabellaObbligatori!: MatTable<InsegnamentoRegola>;
  @ViewChild("insegnamenti") form !:FormGroupDirective; 
  @Output() newInsegnamento: EventEmitter<AttivitaDidattica> =   new EventEmitter();
  @Output() removeInsegnamento: EventEmitter<any> =   new EventEmitter();
  private eventsSubscription!: Subscription;
  @Input() eventsAggiornaTabella!: Observable<void>;
  @Input() dipartimento!: string;


  getDenominazioneInsegnamento(insegnamento : AttivitaDidattica){
    if(insegnamento){
      return insegnamento.denominazioneAttivitaDidattica;
    }else{
      return '';
    }
  }

  selectedInsegnamento(evento : MatAutocompleteSelectedEvent){
    const insegnamento =evento.option.value;
    this.insegnamentiForm.patchValue({
        CodiceInsegnamentoCtrl: insegnamento.codiceAttivitaDidattica,
        SettoreScientificoDisciplinareCtrl : insegnamento.settoreScientificoDisciplinare,
        CFUCtrl: insegnamento.cfu
    });
  }

  addInsegnamento(){
    const attivita = this.insegnamentiForm.get('DenominazioneInsegnamentoCtrl')?.value;
  
    this.insegnamentiTabella.push(attivita);
    this.tabellaObbligatori?.renderRows();
    this.form.resetForm();
    this.newInsegnamento.emit(attivita);
  }

  deleteInsegnamento(){
    this.insegnamentiTabella.pop();
    this.tabellaObbligatori?.renderRows();
    this.removeInsegnamento.emit();
  }
  
  private _filterInsegnamenti(value: string): AttivitaDidattica[] {
    const filterValue = value.toLowerCase();
    return this.insegnamentiAutoComplete.filter(
      (insegnamento) => insegnamento.denominazioneAttivitaDidattica.toLowerCase().includes(filterValue)
    );
  }

  constructor(private _formBuilder: FormBuilder, private sadService : SadService) { 
    this.insegnamentiForm = this._formBuilder.group({
      DenominazioneInsegnamentoCtrl: ['', Validators.required],
      CodiceInsegnamentoCtrl: ['', Validators.required],
      SettoreScientificoDisciplinareCtrl: ['', Validators.required],
      CFUCtrl:['',Validators.required]
    });

    //autocomplete
    this.filteredInsegnamenti = this.insegnamentiForm.get('DenominazioneInsegnamentoCtrl')!.valueChanges.pipe(
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
    if(changes["dipartimento"]){
      console.log("inizializzo");
      this.sadService.getInsegnamentByDipartimento(this.dipartimento).subscribe({
        next: (attivitita : AttivitaDidattica[])=>{
            this.insegnamentiAutoComplete = attivitita;
        }
      });
    }
  }

  ngOnInit() {
    this.eventsSubscription = this.eventsAggiornaTabella.subscribe(() => 
    {
      this.insegnamentiTabella= [];
      this.tabellaObbligatori.renderRows();
    });

  }

}
