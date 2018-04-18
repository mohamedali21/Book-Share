import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor (private _router:Router){

	}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
  	if( localStorage.getItem('userToken') != null )
  		return  true;
  	  	this._router.navigate(['/Login/']);
  	  	return false;
  }
}
