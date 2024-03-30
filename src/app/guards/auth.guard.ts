import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../user/Types';

export const guestGuard: CanActivateFn = (route, state) => {
  let isAuthenticated: boolean = false;
 inject(AuthService).isAuthenticated$.subscribe({
  next: (isLogged) => {
      isAuthenticated = isLogged;
  },

  error: (error) => {
    inject(ToastrService).error("Unable to determine is user is authenticated!", "Error");
  }
 });
if (isAuthenticated) {
  inject(Router).navigate(['/home']);
}
 return !isAuthenticated;
};

export const loggedInGuard: CanActivateFn = (route, state) => {
  let isAuthenticated: boolean = false;
 inject(AuthService).isAuthenticated$.subscribe({
  next: (isLogged) => {
      isAuthenticated = isLogged;
  },
  error: (error) => {
    inject(ToastrService).error("Unable to determine is user is authenticated!", "Error");
  }
 });
if (!isAuthenticated) {
  inject(Router).navigate(['/home']);
}
 return isAuthenticated;
};

export const adminInGuard: CanActivateFn = (route, state) => {
  let isAdmin: boolean = false;
 inject(AuthService).currentUser$.subscribe({
  next: (user: User | null) => {
      if (user && user.roles.includes('ADMIN')) {
        isAdmin = true;
      } else {
        isAdmin = false
      }
  }
 });

 if (!isAdmin) {
  inject(Router).navigate(['/home']);
}

 return isAdmin;
};
