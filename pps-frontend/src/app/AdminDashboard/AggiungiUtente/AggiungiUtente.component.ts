import { AdminService } from './../../Services/Admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SadService } from './../../Services/sad.service';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { CorsoDiStudio } from 'src/app/API/CorsoDiStudio';
import { Roles } from './../../API/Roles.enum';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-AggiungiUtente',
  templateUrl: './AggiungiUtente.component.html',
  styleUrls: ['./AggiungiUtente.component.css']
})
export class AggiungiUtenteComponent implements OnInit {

  ruoli: string[] = [Roles.DOCENTE, Roles.SAD];
  corsiDiStudio : CorsoDiStudio[] = [];
  utenteFormGroup: FormGroup;
  isDocente: boolean=false;
  @ViewChild("utenteForm") form!:FormGroupDirective;

  addUtente(){
    if(this.utenteFormGroup.get("ruoloCtrl")?.value==Roles.SAD){
      const utente = {
        nome: this.utenteFormGroup.get("nomeCtrl")?.value,
        cognome: this.utenteFormGroup.get("cognomeCtrl")?.value,
        email: this.utenteFormGroup.get("emailCtrl")?.value,
      }
      this._adminService.addSadDto(utente).subscribe({
        next: (message: string)=>{
          this._openSnackBar(message);
          this.form.resetForm();
          this.isDocente=false;
        },
        error: (message: string) => this._openSnackBar(message)
      });
    }else{
      if(this.utenteFormGroup.get("ruoloCtrl")?.value==Roles.DOCENTE){
        if(!this.utenteFormGroup.get("corsoDiStudioCtrl")?.value){
          this.utenteFormGroup.get("corsoDiStudioCtrl")!.setErrors([Validators.required])
          return;
        }
        const utente = {
          nome: this.utenteFormGroup.get("nomeCtrl")?.value,
          cognome: this.utenteFormGroup.get("cognomeCtrl")?.value,
          email: this.utenteFormGroup.get("emailCtrl")?.value,
          corsoDiStudio: this.utenteFormGroup.get("corsoDiStudioCtrl")?.value
        }
        this._adminService.addDocenteDto(utente).subscribe({
          next: (message: string)=>{
            this._openSnackBar(message);
            this.form.resetForm();
            this.isDocente=false;
          },
          error: (message: string) => this._openSnackBar(message)
        });
      }
    }
  }

  private _openSnackBar(message: string){
    this._snack.open(message, "close");
  }



  constructor(private _formBuilder: FormBuilder,
    private _sadService: SadService,
    private _snack: MatSnackBar,
    private _adminService: AdminService) {
    this._sadService.getCorsiDiStudio().subscribe({
      next: (corsi: CorsoDiStudio[])=>this.corsiDiStudio= corsi,
      error: (err: string)=>this._openSnackBar(err),
    });
    this.utenteFormGroup = this._formBuilder.group({
      emailCtrl: ['',Validators.required],
      nomeCtrl: ['',Validators.required],
      cognomeCtrl: ['',Validators.required],
      ruoloCtrl: ['',Validators.required],
      corsoDiStudioCtrl: ['']
    });

    this.utenteFormGroup.get("ruoloCtrl")?.valueChanges.subscribe({
      next: (ruolo: string)=>{
        switch(ruolo){
          case Roles.SAD:
            this.isDocente=false;
            break;
            case Roles.DOCENTE:
              this.isDocente=true; 
              break;
        }
      }
    });

   }

  ngOnInit() {
  }

}
