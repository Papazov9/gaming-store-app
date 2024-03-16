import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLogged?: boolean;
  isAdmin?: boolean;
  isAuthSub?: Subscription;
  isAdminSub?: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(
      (isAuthenticated) => (this.isLogged = isAuthenticated)
    );
    this.authService.currentUser$.subscribe((currentUser) => {
      if (currentUser !== null) {
        this.isAdmin = currentUser.roles.includes('ADMIN');
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.isAdminSub?.unsubscribe();
    this.isAuthSub?.unsubscribe();
  }
}
