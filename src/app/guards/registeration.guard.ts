import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const registerationGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  if (localStorage.getItem('token') != null) {
    _router.navigate(['/home']);
    return false;
  } else {
    return true;
  }
};
