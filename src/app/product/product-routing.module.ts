import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductListComponent } from "./product-list/product-list.component";
import { AddNewProductComponent } from "./add-new-product/add-new-product.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";

const routes: Routes = [
  {path: "products", component: ProductListComponent},
  {path: "add-product", component: AddNewProductComponent},
  {path: 'product-details/:id', component: ProductDetailsComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }