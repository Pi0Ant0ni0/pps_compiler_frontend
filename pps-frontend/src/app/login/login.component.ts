import { Roles } from './../API/Roles.enum';
import { User } from './../API/User';
import { RegistrationService } from './../Services/registration.service';
import { Student } from './../API/Student';
import { AuthService } from './../Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public registrationSent: boolean;
  public email:string ="";
  public emailVerified:boolean = false;
  public otp: string="";
  public loginSent : boolean;
  public invalidLogin:boolean =false;
  public invalidRegistration: boolean = false;

  public student :Student;

  registrationRequest(){
    this.invalidRegistration=false;
    if(!this.registrationSent){
      this.registrationService.register(this.student).subscribe({
        next: (message: string)=>{
          this.openSnackBar(message);
          this.emailVerified=true;
        },
        error: (err)=>{
          this.openSnackBar(err);
          this.invalidRegistration=true;
          this.registrationSent=false;
        }
      })
      this.registrationSent=true;
    }
  }


  loginRequest(){
    this.invalidLogin=false;
    if(!this.loginSent){
      this.auth.login(this.email).subscribe({
        next: (message: string) =>  {
          this.openSnackBar(message);
          this.emailVerified=true;
      },
      error : (err) =>{
        this.invalidLogin=true;
        this.openSnackBar(err);
        this.loginSent=false;
      }});
      this.loginSent=true;
  }
  }

  sendOTP(){
    let response;
    if(this.loginSent){
      response  = this.auth.verifyToken(this.email, this.otp);
    }else{
      response = this.registrationService.verifyToken(this.student.email, this.otp);
    }
    response.subscribe({
      next: (response: HttpResponse<User>) =>{
        this.openSnackBar("Benvenuto");
        this.auth.setToken(response.headers.get('Authorization')!)
        const user = response.body! 
        this.auth.setUser(user);
        // vado alla dashboard
        switch(user.ruolo){
          case Roles.SAD:
            this.route.navigate(['sadDashboard']);
            break;
          case Roles.STUDENTE:
            this.route.navigate(['studenteDashboard']);
            break;
          case Roles.DOCENTE:
            this.route.navigate(['docenteDashboard']);
            break;
          case Roles.ADMIN:
            this.route.navigate(['adminDashboard']);
        }
        
    },
      error: (err)=>{
        this.openSnackBar(err);
    }
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'close');
  }


  


  constructor(private auth: AuthService,
              private route : Router,
              private registrationService : RegistrationService,
              private snackBar: MatSnackBar) { 
    this.invalidLogin=false;
    this.invalidRegistration=false;
    this.loginSent=false;
    this.registrationSent=false;
    this.student ={
      nome: "",
      cognome: "",
      matricola: "",
      email: ""
    }
  }

  ngOnInit() {
  }

}
