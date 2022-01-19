import { SadService } from './../../Services/sad.service';
import { AttivitaDidattica } from './../../API/AttivitaDidattica';
import { InsegnamentoRegola } from './../../API/InsegnamentoRegola';
import { Component, OnInit, Output, ViewChild, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MatTable } from '@angular/material/table';
import { Orientamento } from 'src/app/API/Orientamento';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-OrientamentoForm',
  templateUrl: './OrientamentoForm.component.html',
  styleUrls: ['./OrientamentoForm.component.css']
})
export class OrientamentoFormComponent implements OnInit, OnChanges {
  orientamentoPreliminareForm: FormGroup;
  @ViewChild('tabellaOrientamenti') tabellaOrientamenti!: MatTable<InsegnamentoRegola>;
  @ViewChild('stepperOrientamento') stepperOrientamento!: MatStepper;
  displayedOrientamentoColumns: string[] = ['Denominazione Orientamento', 'CFU Liberi', 'CFU Vincolati'];
  orientamentiTabella: Orientamento[] = [];
  private _insegnamentiOrientamentoLiberiTabella: InsegnamentoRegola[] = [];
  private _insegnamentiOrientamentoVincolatiTabella: InsegnamentoRegola[] = [];
  @Output() newOrientamento = new EventEmitter<Orientamento>();
  @Output() removeOrientamento = new EventEmitter<any>();
  @ViewChild(FormGroupDirective) form! :FormGroupDirective;
  aggiornaTabella: Subject<void> = new Subject<void>();
  @Input() dipartimento !:string;
  vincolati:boolean=true;
  liberi:boolean=true;
  attivitaAutoComplete: AttivitaDidattica[] =[];
  
  addInsegnamentoOrientamentoLibero(insegnamento: InsegnamentoRegola) {
    this._insegnamentiOrientamentoLiberiTabella.push(insegnamento);

  }

  addInsegnamentoOrientamentoVincolato(insegnamento: InsegnamentoRegola) {
    this._insegnamentiOrientamentoVincolatiTabella.push(insegnamento);
  }

  removeInsegnamentoOrientamentoVincolato() {
    this._insegnamentiOrientamentoVincolatiTabella.pop();
  }

  removeInsegnamentoOrientamentoLibero() {
    this._insegnamentiOrientamentoLiberiTabella.pop();
  }


  addOrientamento() {
    const orientamento: Orientamento = {
      denominazione: this.orientamentoPreliminareForm.get("denominazioneOrientamentoCtrl")?.value,
      quotaCFULiberi: this.orientamentoPreliminareForm.get("cfuLiberiOrientamentoCtrl")?.value,
      quotaCFUVincolati: this.orientamentoPreliminareForm.get("cfuVincolatiOrientamentoCtrl")?.value,
      insegnamentiLiberi: this._insegnamentiOrientamentoLiberiTabella,
      insegnamentiVincolati: this._insegnamentiOrientamentoVincolatiTabella
    }

    //aggiungo alla struttura anni
    this.orientamentiTabella.push(orientamento);
    this.tabellaOrientamenti?.renderRows();
    this.stepperOrientamento?.reset();
    this.form.resetForm();
    this._insegnamentiOrientamentoLiberiTabella = [];
    this._insegnamentiOrientamentoVincolatiTabella = [];
    this.newOrientamento.emit(orientamento);
    this.aggiornaTabella.next();
  }


  removeSlotOrientamento() {
    this.orientamentiTabella.pop();
    this.tabellaOrientamenti?.renderRows();
    this.removeOrientamento.emit();
  }

  constructor(private _formBuilder: FormBuilder, private _sad: SadService) {
    this.orientamentoPreliminareForm = this._formBuilder.group({
      denominazioneOrientamentoCtrl: ['', Validators.required],
      cfuLiberiOrientamentoCtrl: ['', Validators.required],
      cfuVincolatiOrientamentoCtrl: ['', Validators.required],
    });

   this.orientamentoPreliminareForm.get("cfuLiberiOrientamentoCtrl")?.valueChanges.subscribe({
     next: (cfu: number) => {
       if(cfu==0){
          this.liberi=false;
       }else{
         this.liberi = true;
       }
      },
   });
    this.orientamentoPreliminareForm.get("cfuVincolatiOrientamentoCtrl")?.valueChanges.subscribe({
      next: (cfu: number)=>{
        if(cfu==0){
          this.vincolati=false;
        }else{
          this.vincolati=true;
        }
      }
    });
  }

  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes["dipartimento"]){
      this._sad.getInsegnamentByDipartimento(this.dipartimento).subscribe({
        next: (attivita: AttivitaDidattica[]) => this.attivitaAutoComplete = attivita,
      });
    }
  }

  ngOnInit() {
  }

}
