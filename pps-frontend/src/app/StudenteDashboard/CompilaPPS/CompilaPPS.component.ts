import { Router } from '@angular/router';
import { InsegnamentoRegola } from 'src/app/API/InsegnamentoRegola';
import { SadService } from './../../Services/sad.service';
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PPS } from './../../API/PPS';
import { CorsoDiStudio } from 'src/app/API/CorsoDiStudio';
import { StudentService } from './../../Services/Student.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AttivitaDidattica } from 'src/app/API/AttivitaDidattica';
import { Orientamento } from 'src/app/API/Orientamento';
import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-CompilaPPS',
  templateUrl: './CompilaPPS.component.html',
  styleUrls: ['./CompilaPPS.component.css']
})
export class CompilaPPSComponent implements OnInit {

  orientamento: InsegnamentoRegola[]=[];
  insegnamentiAScelta: AttivitaDidattica[] = [];
  coorte:number |undefined;
  codiceCorsoDiStudio:string |undefined;
  preliminariForm: FormGroup;
  @ViewChild('stepperPPS') stepper!: MatStepper;
  corsiDiStudio: CorsoDiStudio[] = [];
  valid:boolean=false;
  thereIsOrientamento :boolean=true;

  addValid(valid: boolean){
    this.valid=valid;
  }

  isThereOrientamento(flag: boolean){
    this.thereIsOrientamento = flag;
  }

  addOrientamento(orientamento: InsegnamentoRegola[]){
    this.orientamento = orientamento;
  }

  addInsegnamento(insegnamento: AttivitaDidattica){
    this.insegnamentiAScelta.push(insegnamento);
  }

  removeInsegnamento(){
    this.insegnamentiAScelta.pop();
  }

  addPPS(){
    if(this.orientamento && this.insegnamentiAScelta){
      const pps = {
      attivitaDidatticheAScelta :this.insegnamentiAScelta,
      orientamento: this.orientamento,
      coorte: this.coorte!
      };

      this._studedentService.addPPS(pps).subscribe({
        next:(message: string) =>{
          this._openSnackBar(message);
          this.stepper.reset();
          this._route.navigate(["/"]).then(()=>this._route.navigate(["studenteDashboard/visualizzaPPS"]));
        },
        error:(error: string)=>{this._openSnackBar(error);}
      });
    }
  }

  private _openSnackBar(message:string){
    this._snack.open(message, "close");
  }


  constructor(private _formBuilder:FormBuilder,
    private _studedentService: StudentService,
    private _snack: MatSnackBar,
    private _sadService: SadService,
    private _route: Router) {

    this.preliminariForm = this._formBuilder.group({
      coorteCtrl:[Validators.required],
      corsiDiStudioCtrl: [Validators.required]
    });

    this._sadService.getCorsiDiStudio().subscribe({
      next: (corsi: CorsoDiStudio[]) => this.corsiDiStudio = corsi,
    });

    this.preliminariForm.get("coorteCtrl")?.valueChanges.subscribe({next: (coorte: number)=> this.coorte=coorte});
    this.preliminariForm.get("corsiDiStudioCtrl")?.valueChanges.subscribe({next: (corsoDiStudio: CorsoDiStudio)=> this.codiceCorsoDiStudio=corsoDiStudio.codice});
   }

  ngOnInit() {
  }

}
