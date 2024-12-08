import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

export const managerGuard: CanActivateFn = (route, state) => {
  const _AuthService = inject(AuthService);
  const _Router = inject(Router);
  if (
    localStorage.getItem('userToken') !== null &&
    _AuthService.getRole() === 'Manager'
  ) {
    return true;
  } else {
    _Router.navigate(['/dashboard/']);
    return false;
  }
};
