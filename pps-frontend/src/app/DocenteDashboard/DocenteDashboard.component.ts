import { Component, OnInit } from '@angular/core';
import { User } from '../API/User';
import { AuthService } from '../Services/auth.service';
import { DocenteService } from '../Services/Docente.service';

@Component({
  selector: 'app-DocenteDashboard',
  templateUrl: './DocenteDashboard.component.html',
  styleUrls: ['./DocenteDashboard.component.css']
})
export class DocenteDashboardComponent implements OnInit {

  docente:User;
  

  constructor(private _auth : AuthService) {
    this.docente = this._auth.getUser();
  }

  ngOnInit(): void {
  }

  logout(){
    this._auth.logout();
  }

}
