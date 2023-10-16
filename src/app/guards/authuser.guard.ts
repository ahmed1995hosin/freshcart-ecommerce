import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authuserGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  // const _Router = inject(Router);
  // const _Router = inject(Router);
  // this is anther way to create a new instance of the router service class
  // inside the method
  // const _Router=inject(Router);
  if (localStorage.getItem('token') != null) {
    return true;
  } else {
    _router.navigate(['/login']);
    return false;
  }
};
