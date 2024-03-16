import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './home/main/main.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [ 
  {path:"", pathMatch:"full", redirectTo:"/home"},
  {path:"home", component: MainComponent},
  {path: "**", redirectTo:'/404'},
  {path: '404', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
