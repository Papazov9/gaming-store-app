import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../products';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit{

  @Input() product!: Product;
  src!: string;
  oldPrice?: number;
  price!: number;

  constructor() {
  }

  ngOnInit(): void {
    if (this.product.imageUrl.startsWith('data:image')) {
      this.src = this.product.imageUrl;
    }else
    {
      this.src = `data:image/jpg;base64, ${this.product.imageUrl}`;
    }
    if (this.product.isOnSale) {
      this.oldPrice = this.product.price
      this.price = this.oldPrice * 0.8;
    }else
    {
      this.price = this.product.price;
    }
  }
}
