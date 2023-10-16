import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const tokenUnAvailGuard: CanActivateFn = (route, state) => {
  const routers = inject(Router);
  if (localStorage.getItem('token')) {
    routers.navigate(['/login']);
    return false;
  } else {
    return true;
  }
};
