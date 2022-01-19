import { ManifestoPreview } from './../API/ManifestoPreview';
import { CorsoDiStudio } from './../API/CorsoDiStudio';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { SadService } from '../Services/sad.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-Manifesti',
  templateUrl: './Manifesti.component.html',
  styleUrls: ['./Manifesti.component.css']
})
export class ManifestiComponent implements OnInit {

  public corsiDiStudio : CorsoDiStudio[] = []
  public manifesti: ManifestoPreview[] = [];
  public urlAnno = "/rest/regole";
  public manifestiFormGroup : FormGroup;


  private _openSnackBar(message: string) {
    this.snackBar.open(message, 'close');
  }



  constructor(
    private sadService : SadService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder) { 
    this.sadService.getCorsiDiStudio().subscribe({
      next: (corsiDiStudio : CorsoDiStudio[]) =>{this.corsiDiStudio = corsiDiStudio;},
      error: (err)=>{this._openSnackBar(err);}
    });

    this.manifestiFormGroup = this.formBuilder.group({
      corsiDiStudioCtrl :[''],
    });

    this.manifestiFormGroup.get("corsiDiStudioCtrl")!.valueChanges.subscribe({
      next: (corsoDiStudio : CorsoDiStudio) =>{
        this.sadService.getManifestiPreview(corsoDiStudio.codice).subscribe({
          next: (manifesti: ManifestoPreview[]) =>{this.manifesti = manifesti}
        });
        this.urlAnno= "/rest/regole/"+corsoDiStudio.codice;
      }
    });

  }

  
  ngOnInit() {
  }

}
