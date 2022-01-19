import { PPSPreview } from './../API/PPSPreview';
import { DocenteService } from './../Services/Docente.service';
import { AuthService } from './../Services/auth.service';
import { User } from './../API/User';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-StudenteDashboard',
  templateUrl: './StudenteDashboard.component.html',
  styleUrls: ['./StudenteDashboard.component.css']
})
export class StudenteDashboardComponent implements OnInit {

  studente:User;
  compiled: boolean=false;

  constructor(private _auth : AuthService, private _docenteService: DocenteService) {
    this.studente = this._auth.getUser();
    this._docenteService.getPPSCompleto(this.studente.email).subscribe({
      next:(pps: PPSPreview)=>{
        if(pps.approvato || (!pps.approvato && !pps.rifiutato)){
          this.compiled=true;
        }else{
          this.compiled=false;
        }
      },
      error: ()=>this.compiled=false,
    });
  }

  logout(){
    this._auth.logout();
  }

  ngOnInit() {
  }

}
