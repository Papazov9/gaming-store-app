import { CanActivateFn, Router } from '@angular/router';
import { GuardService } from './guard-service.service';

export const authGuard: CanActivateFn = (route, state) => {
 return true;
};
