import { Component, OnInit } from '@angular/core';
import { User } from '../API/User';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-AdminDashboard',
  templateUrl: './AdminDashboard.component.html',
  styleUrls: ['./AdminDashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  admin:User;

  constructor(private _auth : AuthService) {
    this.admin = this._auth.getUser();
  }

  logout(){
    this._auth.logout();
  }

  ngOnInit() {
  }

}
