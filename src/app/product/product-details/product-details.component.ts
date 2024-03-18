import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductView } from '../products';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/user/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy{

  product?: ProductView;
  oldPrice?: number;
  price?: number;
  isAdmin?: boolean;
  adminSub?: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router, 
    private productService: ProductService, 
    private toastrService: ToastrService,
    private authService: AuthService
    ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const productId = params['id'];
      this.productService.findProductById(productId).subscribe({
        next: (product) => {
          this.product = product;
          this.prepareProduct.bind(this);
          this.toastrService.success("Details successfully loaded!", "Success");
        },
        error: (error) => {
          this.router.navigate(['products']);
          this.toastrService.error(`Failed!\n ${error.error.message}`, "Error");
        }
      });
    });

    this.authService.currentUser$.subscribe( user => this.isAdmin = user?.roles.includes('ADMIN'));
  }
  private prepareProduct() {
    if (this.product?.isOnSale) {
      this.oldPrice = this.product.price
      this.price = this.oldPrice * 0.8;
    }else
    {
      this.price = this.product?.price;
    }
  }

  ngOnDestroy(): void {
    this.adminSub?.unsubscribe();
  }
}
