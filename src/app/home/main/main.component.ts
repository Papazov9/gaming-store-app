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
  usernameSub?: Subscription;

  constructor(public authService: AuthService){
  }

 ngOnInit(): void {
  this.usernameSub = this.authService.currentUser$.subscribe(current => {
    this.username = current?.username
    console.log(this.username);
  })
 }

 ngOnDestroy(): void {
   if (this.usernameSub) {
    this.usernameSub.unsubscribe();
   }
 }
}
