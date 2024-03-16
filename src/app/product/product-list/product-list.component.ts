import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../products';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy{


  subscription?: Subscription;
  products: Product[] = [];

  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.subscription = this.productService.getAllProducts()
    .subscribe((products: Product[]) => this.products = products);
    console.log(this.products);
    
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription?.unsubscribe();
    }
  }

}
