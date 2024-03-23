import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ProductView } from '../products';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy{


  subscription?: Subscription;
  products: ProductView[] = [];

  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.subscription = this.productService.getAllProducts()
    .subscribe((products: ProductView[]) => this.products = products);    
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription?.unsubscribe();
    }
  }

}
