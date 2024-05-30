import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenService } from '../../core//services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
