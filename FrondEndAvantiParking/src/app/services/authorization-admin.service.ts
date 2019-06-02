import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationAdminService {


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    
      return this.Token.rolV(true);
    
  }
  constructor(private Token: TokenService) {
    setTimeout(() => {
      this.Token.rolV(true);
    },12000);
  }
  



}
