import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    const requiredRole = route.data['role'];
    if (requiredRole && !authService.hasRole(requiredRole)) {
      // Redirect to correct dashboard if role mismatch
      const userRole = authService.currentUserValue?.role;
      if (userRole) {
        router.navigate([`/dashboard/${userRole.toLowerCase()}`]);
      } else {
        router.navigate(['/login']);
      }
      return false;
    }
    return true;
  }

  router.navigate(['/login']);
  return false;
};
