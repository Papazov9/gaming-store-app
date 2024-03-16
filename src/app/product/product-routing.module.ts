import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductListComponent } from "./product-list/product-list.component";
import { AddNewProductComponent } from "./add-new-product/add-new-product.component";

const routes: Routes = [
  {path: "products", component: ProductListComponent},
  {path: "add-product", component: AddNewProductComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }