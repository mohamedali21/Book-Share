import { Injectable } from '@angular/core';

import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthGuard } from './auth.guard';

//import decode from 'jwt-decode';
//import * as jwt_decode from 'jwt-decode';

@Injectable()
export class RoleGuardService {

  constructor(public auth: AuthGuard, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('userToken');

    // decode the token to get its payload
    const role = localStorage.getItem('role')

    if ( role !== 'admin' ) {
      this.router.navigate(['ads']);
      return false;
    }
    return true;
  }

}
