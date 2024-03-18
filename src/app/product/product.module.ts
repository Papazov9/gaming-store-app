import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductRoutingModule } from './product-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './product-details/product-details.component';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductItemComponent,
    AddNewProductComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    ProductRoutingModule
  ],
  exports: [
    ProductListComponent,
    ProductItemComponent,
    AddNewProductComponent
  ]
})
export class ProductModule { }
