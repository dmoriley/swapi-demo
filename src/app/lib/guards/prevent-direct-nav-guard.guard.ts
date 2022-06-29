import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

/**
 * Guard to prevent a route from being directly navigated to by typing in the url
 */
@Injectable({
  providedIn: 'root',
})
export class PreventDirectNavigationGuard implements CanActivate {
  constructor(private _router: Router) {}
  canActivate(
    _activatedRouteSnapshot: ActivatedRouteSnapshot,
    _routerStateSnapshot: RouterStateSnapshot
  ): boolean | UrlTree {
    return this._router.navigated;
  }
}
