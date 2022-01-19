import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../Services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log('controllo se ci sono i permessi');
        const user = this.authenticationService.getUser();
        console.log(user.ruolo);
        if (user) {
            console.log('ho lo user');
            console.log(route.data['role']);
            if (route.data['role']  == user.ruolo) {
                return true;
            }

            return false;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login']);
        return false;
    }
}