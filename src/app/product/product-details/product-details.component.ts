import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductView } from '../products';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/user/auth.service';
import { Subscription } from 'rxjs';
import Swal  from 'sweetalert2';

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
          this.prepareProduct();
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

  confirmDelete(): void {
    Swal.fire({
      title: 'Delete Dialog',
      text: 'Are you sure you want to delete product with name: ' + this.product?.name,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: 'red',
      reverseButtons: true
    }).then((res) => {
      if (res.isConfirmed) {
        this.deleteProduct();
      }
    })
  }

  deleteProduct(): void {
    if (!this.product?.id) {
      this.toastrService.error('Invalid product or product id!', 'Error');
      return;
    }
    this.productService.deleteProduct(this.product?.id).subscribe({
      next: () => {
        this.toastrService.success("Products is deleted successfully!", "Success");
        this.router.navigate(['products']);
      },

      error: (error) => {
        this.toastrService.error("Unable to delete this product!", "Error");
        this.router.navigate(['products']);
      }
    })
  }

  ngOnDestroy(): void {
    this.adminSub?.unsubscribe();
  }
}
