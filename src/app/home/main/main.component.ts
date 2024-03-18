import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy{

  username?: string;
  isAuthenticated!: boolean;
  usernameSub?: Subscription;
  isAuthSub?: Subscription;

  constructor(public authService: AuthService){
  }

 ngOnInit(): void {
  this.usernameSub = this.authService.currentUser$.subscribe(current => this.username = current?.username);
  this.isAuthSub = this.authService.isAuthenticated$.subscribe(isAuth => this.isAuthenticated = isAuth);
 }

 ngOnDestroy(): void {
   if (this.usernameSub) {
    this.usernameSub.unsubscribe();
   }

   if (this.isAuthSub) {
    this.isAuthSub.unsubscribe();
   }
 }
}
