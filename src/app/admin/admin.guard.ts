import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {SessionService} from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
/**
 * This class is used to answer intern admin-requests.
 *
 * @public
 */
export class AdminGuard implements CanActivate {

  /**
   * The constructor of the class 'AdminGuard'
   *
   * @param _sessionService SessionService  The instance of the current session.
   */
  constructor(private _sessionService: SessionService) {
  }

  /**
   * This method checks, whether the current user is logged in as an admin.
   *
   * @return true, if current user is an admin; false otherwise.
   *
   * @public
   */
  isAdmin() {
    return this._sessionService.getCurrentUser().isAdmin();
  }

  /**
   * This method gets the current router-state and the destiny of the user and calls the {@link isAdmin isAdmin()}
   * method.
   *
   * @param next ActivatedRouteSnapshot  Information about a route of a component.
   * @param state RouterStateSnapshot  The state of the router.
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAdmin();
  }
}
