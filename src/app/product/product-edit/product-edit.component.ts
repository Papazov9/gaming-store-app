import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductView } from '../products';
import { ToastrService } from 'ngx-toastr';
import { Subscription, tap } from 'rxjs';
import Swal  from 'sweetalert2';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, OnDestroy{

  editForm!: FormGroup;
  product?: Product;
  productId!: string;
  paramsSub$?: Subscription;
  file?: File | null;
  encodedFileString?: string;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private formBuilder: FormBuilder, 
    private productService: ProductService, 
    private router: Router,
    private toastrService: ToastrService) {}

  ngOnInit(): void {
    this.prepareForm();
    this.loadProductDetails();
  }

  private prepareForm(): void {
    this.editForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: [1, [Validators.required, Validators.min(0.01)]],
      isOnSale: [false]
    });
  } 

  private loadProductDetails(): void {
    this.paramsSub$ = this.activatedRoute.params.subscribe((params) => {
      this.productId = params['id'] || '';
      this.productService.findProductById(this.productId).subscribe({
        next: (prod) => {
          this.product = prod;
          this.editForm.patchValue(prod);
        },

        error: (error) => {
          if (this.productId != null && this.productId != '') {
            this.router.navigate([`product-details`, this.productId]);
          }
          this.toastrService.error("Failed to load edit of product with id: " + this.productId, "Error");
        }
      })
    });
  }

  onFileInput(event: Event) {
    const target = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = target.files;
    if (fileList) {
     this.file = fileList.item(0);
     if (this.file) {
       const reader = new FileReader();
       reader.readAsDataURL(this.file);
       reader.onload = () => {
       this.encodedFileString = reader.result as string;
       }
     }
    }
   }

  confirmEditDialog(): void {
    Swal.fire({
      title: 'Confirmation!',
      text: 'Are you sure you wan to change this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'red',
      reverseButtons: true
    }).then((res) => {
      if (res.isConfirmed) {
        this.editProduct();
      }
    })
  }

  editProduct(): void {
    const productSubmit: ProductView = {
      id: this.productId,
      ...this.editForm.value
    }
    if (this.encodedFileString) {
      productSubmit.imageUrl = this.encodedFileString;
    } else if (this.product) {
      productSubmit.imageUrl = this.product?.imageUrl;
    }else {
      this.router.navigate(['products']);
      this.toastrService.error("Error while submitting image of product!", "Error");
    }

    this.productService.editProduct(productSubmit).subscribe({
      next: () => {
        this.router.navigate(['product-details', this.productId]);
        this.toastrService.success("Product changed successfully!", "Success");
      },
      error: (error) => {
        this.router.navigate(['products']);
        this.toastrService.error("Failed to load edit of product with id: " + this.productId, "Error");
      }
    });
  }


  ngOnDestroy(): void {
    if (this.paramsSub$) {
      this.paramsSub$.unsubscribe();
    }
  }
}
