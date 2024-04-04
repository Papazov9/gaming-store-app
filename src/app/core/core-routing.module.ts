import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { loggedInGuard } from "../guards/auth.guard";

const routes: Routes= [
  {path: '', canActivateChild: [loggedInGuard], children: [
    {path: 'about', component: AboutComponent},
    {path: 'checkout', component: CheckoutComponent}
  ]}
]

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class CoreRoutingModule { }