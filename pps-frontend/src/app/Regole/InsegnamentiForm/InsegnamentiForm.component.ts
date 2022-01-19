import { CorsoDiStudio } from './../../API/CorsoDiStudio';
import { SadService } from '../../Services/sad.service';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { AttivitaDidattica } from 'src/app/API/AttivitaDidattica';
import { InsegnamentoRegola } from 'src/app/API/InsegnamentoRegola';

@Component({
  selector: 'app-InsegnamentiForm',
  templateUrl: './InsegnamentiForm.component.html',
  styleUrls: ['./InsegnamentiForm.component.css']
})
export class InsegnamentiFormComponent implements OnInit, OnChanges {


  filteredInsegnamentiObbligatori : Observable<AttivitaDidattica[]>
  insegnamentiObbligatoriForm: FormGroup;
  insegnamentiTabella: InsegnamentoRegola[] = [];
  displayedColumns: string[] = ['Denominazione Insegnamento', 'Codice Insegnamento', 'Settore', 'CFU', 'Semestre', 'Annuale', 'Integrato', 'Corso Di Studio Mutuo'];
  semestri : string[] = ["1" , "2", "1-2", "1 o 2"];
  corsiDiStudio : CorsoDiStudio[]= [];
  @ViewChild('tabellaObbligatori') tabellaObbligatori!: MatTable<InsegnamentoRegola>;
  @ViewChild("insegnamentiObbligatori") form !:FormGroupDirective; 
  @Output() newInsegnamento: EventEmitter<InsegnamentoRegola> =   new EventEmitter();
  @Output() removeInsegnamento: EventEmitter<any> =   new EventEmitter();
  private eventsSubscription!: Subscription;
  @Input() eventsAggiornaTabella!: Observable<void>;
  @Input() codiceCorsoDiStudio!: string;
  @Input() insegnamentiAutoComplete : AttivitaDidattica[] = [];


  getDenominazioneInsegnamento(insegnamento : AttivitaDidattica){
    if(insegnamento){
      return insegnamento.denominazioneAttivitaDidattica;
    }else{
      return '';
    }
  }

  selectedInsegnamentoObbligatorio(evento : MatAutocompleteSelectedEvent){
    const insegnamento =evento.option.value;
    this.insegnamentiObbligatoriForm.patchValue({
        CodiceInsegnamentoCtrl: insegnamento.codiceAttivitaDidattica,
        SettoreScientificoDisciplinareCtrl : insegnamento.settoreScientificoDisciplinare,
        CFUCtrl: insegnamento.cfu
    });
  }

  addInsegnamentoObbligatorio(){
    const insegnamentoSelezionato = this.insegnamentiObbligatoriForm.get('DenominazioneInsegnamentoCtrl')?.value;
    const insegnamento = {
      codiceInsegnamento : insegnamentoSelezionato.codiceAttivitaDidattica,
      denominazioneInsegnamento :insegnamentoSelezionato.denominazioneAttivitaDidattica ,
      cfu : insegnamentoSelezionato.cfu,
      settoreScientificoDisciplinare : insegnamentoSelezionato.settoreScientificoDisciplinare,
      semestre : this.insegnamentiObbligatoriForm.get('SemestreCtrl')?.value,
      annualeFlag  :  this.insegnamentiObbligatoriForm.get('SemestreCtrl')?.value=="1-2"? true: false,
      insegnamentoIntegratoFlag : this.insegnamentiObbligatoriForm.get('IntegratoCtrl')?.value==null? false: true,
      codiceCorsoDiStudioMuoto: this.insegnamentiObbligatoriForm.get('corsiDiStudioCtrl')?.value==null?'':this.insegnamentiObbligatoriForm.get('corsiDiStudioCtrl')?.value.codice
    }
    this.insegnamentiTabella.push(insegnamento);
    this.tabellaObbligatori?.renderRows();
    this.form.resetForm();
    this.newInsegnamento.emit(insegnamento);
  }

  removeInsegnamentoObbligatorio(){
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
    this.insegnamentiObbligatoriForm = this._formBuilder.group({
      DenominazioneInsegnamentoCtrl: ['', Validators.required],
      CodiceInsegnamentoCtrl: ['', Validators.required],
      SettoreScientificoDisciplinareCtrl: ['', Validators.required],
      CFUCtrl:['',Validators.required],
      SemestreCtrl:['',Validators.required],
      IntegratoCtrl:[],
      corsiDiStudioCtrl:[]
    });

    this.sadService.getCorsiDiStudio().subscribe({
      next: (corsiDiStudio: CorsoDiStudio[]) => { this.corsiDiStudio = corsiDiStudio; }
    });

    //autocomplete
    this.filteredInsegnamentiObbligatori = this.insegnamentiObbligatoriForm.get('DenominazioneInsegnamentoCtrl')!.valueChanges.pipe(
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
    if(changes["codiceCorsoDiStudio"]){
      let insegnamentiTotali : AttivitaDidattica[]=[];
      this.sadService.getInsegnamentiErogatiCorsoDiStudio(this.codiceCorsoDiStudio).subscribe({
        next: (insegnamentiErogati : AttivitaDidattica[])=>{
          this.sadService.getInsegnamentiProgrammatiCorsoDiStudio(this.codiceCorsoDiStudio).subscribe({
            next: (insegnamentiProgrammati : AttivitaDidattica[])=>{
              this.insegnamentiAutoComplete = this.insegnamentiAutoComplete.concat(this.insegnamentiAutoComplete,insegnamentiErogati, insegnamentiProgrammati);
            }
          });
        }
      });
    
      this.insegnamentiAutoComplete = insegnamentiTotali;
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
