import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenService } from '../../core//services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const jwtHelper = inject(JwtHelperService);
  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (jwtHelper.isTokenExpired(tokenService.access_token)) {
    console.log('Token has expires or user has logged out!');
    return router.parseUrl('/auth');
  }
  console.log('User is authenticated!');
  return true;
};
