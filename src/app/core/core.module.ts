import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CoreRoutingModule } from './core-routing.module';
import { CartComponent } from './cart/cart.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreRoutingModule
  ],
  exports:[HeaderComponent,
    FooterComponent]
})
export class CoreModule { }
