import { Roles } from './API/Roles.enum';
import { Component } from '@angular/core';
import { AuthService } from './Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pps-frontend';

  ngOnInit() {
    if(this.auth.isLogged()){
      const ruolo = this.auth.getUser().ruolo;
      switch(ruolo){
        case Roles.SAD:
          this.route.navigate(["sadDashboard"]);
          break;
        case Roles.STUDENTE:
          this.route.navigate(["studenteDashboard"]);
          break;
        case Roles.DOCENTE:
          this.route.navigate(["docenteDashboard"]);
          break;
        case Roles.ADMIN:
          this.route.navigate(["adminDashboard"]);
          break;
      }
      
    }else{
      this.route.navigate(["login"])
    }
  }

  constructor(private auth: AuthService, private route : Router) { }
}
