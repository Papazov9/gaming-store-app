import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductListComponent } from "./product-list/product-list.component";
import { AddNewProductComponent } from "./add-new-product/add-new-product.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";
import { ProductEditComponent } from "./product-edit/product-edit.component";
import { adminInGuard, loggedInGuard } from "../guards/auth.guard";

const routes: Routes = [
  {path: '', canActivateChild: [loggedInGuard], children: [
    {path: "products", component: ProductListComponent},
    {path: 'product-details/:id', component: ProductDetailsComponent},
  ]},
  {path: '', canActivateChild: [loggedInGuard, adminInGuard], children:[
    {path: "add-product", component: AddNewProductComponent},
    {path: 'product-edit/:id', component: ProductEditComponent}
  ]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }