import { AttivitaDidattica } from './../API/AttivitaDidattica';
import { AttivitaDidatticheAScelta } from '../API/AttivitaDidatticheAScelta';
import { AttivitaDidatticheVincolateDalCorsoDiStudio } from '../API/AttivitaDidatticheVincolateDalCorsoDiStudio';
import { Orientamento } from './../API/Orientamento';
import { InsegnamentoRegola } from './../API/InsegnamentoRegola';
import { SadService } from './../Services/sad.service';
import { CorsoDiStudio } from './../API/CorsoDiStudio';
import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, Form, FormGroupDirective } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';
import { map, Observable, startWith } from 'rxjs';
import { AnnoAccademico } from '../API/AnnoAccademico';
import { MatStepper } from '@angular/material/stepper';



@Component({
  selector: 'app-Regole',
  templateUrl: './Regole.component.html',
  styleUrls: ['./Regole.component.css'],
})
export class RegoleComponent implements OnInit {
  private strutturaAnni: Map<number, AnnoAccademico>;
  private conteggioAnni: number;
  annoOrdinamento: number = 0;
  corsiDiStudio: CorsoDiStudio[] = []
  //reactive form
  preliminariForm: FormGroup;
  //anni corso di studio
  anni: number[] = [];
  //autocomplete
  //expansiona panel per garantire la mutua esclusione
  pannelloAnno: number = 1;
  pannelloInsegnamenti: number =0;
  //tabelle per la preview
  @ViewChild('stepperRegola') stepperRegola: MatStepper | undefined;
  @ViewChild(FormGroupDirective) form! :FormGroupDirective;
  codiceCorsoDiStudioCorrente:string ='';
  dipartimento: string="";
  insegnamentiAScelta : AttivitaDidattica[]=[];


  setPannelloAnno(pannello: number) {
    this.pannelloAnno = pannello;
    this.pannelloInsegnamenti=0;
  
  }

  setPannelloInsegnamenti(pannello: number){
    this.pannelloInsegnamenti=pannello;
  }


  addInsegnamentoObbligatorio(anno: number, insegnamento: InsegnamentoRegola) {

    //aggiungo alla struttura anni
    const schemaDiPiano = this.strutturaAnni.get(anno)!;
    const insegnamentiObbligatori = schemaDiPiano!.insegnamentiObbligatori;
    insegnamentiObbligatori.push(insegnamento);
    schemaDiPiano!.insegnamentiObbligatori = insegnamentiObbligatori;
    this.strutturaAnni.set(anno, schemaDiPiano);
  }

  addInsegnamentoAScelta(insegnamento: AttivitaDidattica) {
    this.insegnamentiAScelta.push(insegnamento);
    
  }

  addInsegnamentoVincolato(anno: number, insegnamentoVincolato: AttivitaDidatticheVincolateDalCorsoDiStudio) {
    //aggiungo alla struttura anni
    const schemaDiPiano = this.strutturaAnni.get(anno)!;
    const vincolati = schemaDiPiano!.attivitaDidatticheVincolateDalCorsoDiStudio;
    vincolati.push(insegnamentoVincolato);
    schemaDiPiano!.attivitaDidatticheVincolateDalCorsoDiStudio = vincolati;
    this.strutturaAnni.set(anno, schemaDiPiano);
  }
  addOrientamento(anno: number, orientamento: Orientamento) {
    //aggiungo alla struttura anni
    const schemaDiPiano = this.strutturaAnni.get(anno)!;
    const orientamenti = schemaDiPiano!.orientamenti;
    orientamenti.push(orientamento);
    schemaDiPiano!.orientamenti = orientamenti;
    this.strutturaAnni.set(anno, schemaDiPiano);
  }


  removeInsegnamentoVincolato(anno: number) {
    //aggiungo alla struttura anni
    const schemaDiPiano = this.strutturaAnni.get(anno)!;
    const vincolati = schemaDiPiano!.attivitaDidatticheVincolateDalCorsoDiStudio;
    vincolati.pop();
    schemaDiPiano!.attivitaDidatticheVincolateDalCorsoDiStudio = vincolati;
    this.strutturaAnni.set(anno, schemaDiPiano);
  }

  deleteInsegnamentoAScelta() {
    this.insegnamentiAScelta.pop();
  }

  removeInsegnamentoObbligatorio(anno: number) {
    const schemaDiPiano = this.strutturaAnni.get(anno)!;
    const insegnamentiObbligatori = schemaDiPiano!.insegnamentiObbligatori;
    insegnamentiObbligatori.pop();
    schemaDiPiano!.insegnamentiObbligatori = insegnamentiObbligatori;
    this.strutturaAnni.set(anno, schemaDiPiano);
  }

  removeOrientamento(anno: number) {
    //aggiungo alla struttura anni
    const schemaDiPiano = this.strutturaAnni.get(anno)!;
    const orientamenti = schemaDiPiano!.orientamenti;
    orientamenti.pop();
    schemaDiPiano!.orientamenti = orientamenti;
    this.strutturaAnni.set(anno, schemaDiPiano);
  }


  private _openSnackBar(message: string) {
    this.snackBar.open(message, 'close');
  }

  addCfuAScelta(anno:number, cfu: string){
     //aggiungo alla struttura anni
     const schemaDiPiano = this.strutturaAnni.get(anno)!;
     schemaDiPiano!.cfuAScelta = Number(cfu);
     this.strutturaAnni.set(anno, schemaDiPiano);
  }

  addAnno() {
    this.anni.push(this.conteggioAnni);
    this.strutturaAnni.set(this.conteggioAnni, {
      attivitaDidatticheVincolateDalCorsoDiStudio: [],
      cfuAScelta: 0,
      insegnamentiObbligatori: [],
      orientamenti: []
    });
    this.setPannelloAnno(0);
    this.conteggioAnni++;
  }
  removeAnno() {
    this.anni.pop();
    this.strutturaAnni.delete(this.strutturaAnni.size);
    this.conteggioAnni--;
  }

  addRegola() {
    const regola = {
      coorte: this.preliminariForm.get("annoCorteCtrl")?.value,
      codiceCorsoDiStudio: this.preliminariForm.get("corsiDiStudioCtrl")?.value.codice,
      annoOrdinamento: this.preliminariForm.get("annoOrdinamentoCtrl")?.value,
      cfuASceltaLibera: this.preliminariForm.get("cfuASceltaCtrl")?.value,
      cfuOrientamento: this.preliminariForm.get("cfuOrientamentoCtrl")?.value,
      cfuTotali: this.preliminariForm.get("cfuTotaliCtrl")?.value,
      cfuExtra: this.preliminariForm.get("cfuExtraCtrl")?.value,
      anniAccademici: this.strutturaAnni,
      curricula: this.preliminariForm.get("curriculaCtrl")?.value,
      attivitaDidatticheAScelta: this.insegnamentiAScelta,
      dataInizioCompilazionePiano: this.preliminariForm.get("dataInizioCompilazioneCtrl")?.value,
      dataFineCompilazionePiano: this.preliminariForm.get("dataFineCompilazioneCtrl")?.value
    }
    this.sadService.addRegola(regola).subscribe({
      next: (message: string) => {
        this.stepperRegola?.reset();
        this.form.resetForm();
        this.preliminariForm.patchValue({annoOrdinamentoCtrl: this.annoOrdinamento});
        this._openSnackBar(message);
      },
      error: (err: string) => {
        this._openSnackBar(err);
      }
    });
    
  }



  constructor(private sadService: SadService,
    private snackBar: MatSnackBar,
    private _formBuilder: FormBuilder) {

   

    this.preliminariForm = this._formBuilder.group({
      annoOrdinamentoCtrl: ['', Validators.required],
      corsiDiStudioCtrl: ['', Validators.required],
      annoCorteCtrl: ['', Validators.required],
      cfuASceltaCtrl: ['', Validators.required],
      cfuOrientamentoCtrl: ['', Validators.required],
      cfuTotaliCtrl: ['', Validators.required],
      cfuExtraCtrl: ['', Validators.required],
      curriculaCtrl: [''],
      dataInizioCompilazioneCtrl: ['',Validators.required],
      dataFineCompilazioneCtrl:['',Validators.required]
    });

    this.preliminariForm.get("corsiDiStudioCtrl")?.valueChanges.subscribe({
      next: (corso: CorsoDiStudio)=>{
        this.sadService.getordinamentoCorrente(corso.codice).subscribe({
          next: (anno: number) => {
            this.annoOrdinamento = anno;
            this.preliminariForm.patchValue({ annoOrdinamentoCtrl: this.annoOrdinamento });
          }
        });

      }
    });

    this.preliminariForm.get("corsiDiStudioCtrl")?.valueChanges.subscribe({
      next: (corsoDiStudio : CorsoDiStudio) => {
        this.codiceCorsoDiStudioCorrente = corsoDiStudio.codice;
        this.dipartimento = corsoDiStudio.denominazioneFacolta;
      },
    });

    this.sadService.getCorsiDiStudio().subscribe({
      next: (corsiDiStudio: CorsoDiStudio[]) => { this.corsiDiStudio = corsiDiStudio; },
      error: (err) => { this._openSnackBar(err); }
    });

    

    this.conteggioAnni = 1;
    this.strutturaAnni = new Map<number, AnnoAccademico>();
  }



  ngOnInit() {
  }

}
