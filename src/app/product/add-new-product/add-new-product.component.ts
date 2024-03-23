import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription, catchError, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Product } from '../products';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit, OnDestroy{

  addProductForm!: FormGroup;
  file?: File | null;
  encodedFileString!: string;
  addProbSub$?: Subscription;

  constructor(private formBuilder: FormBuilder, private productService: ProductService, private toastrService: ToastrService, private router: Router) {}
  

  ngOnInit(): void {
    this.addProductForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: [1, [Validators.required, Validators.min(0.01)]],
      isOnSale: [false,]
    });
  }

  addProduct() {
    const product: Product = {
      ...this.addProductForm.value,
    }
    product.imageUrl = this.encodedFileString!;

    this.productService.addProduct(product)
    .pipe(
      tap((response) => {
        this.toastrService.success("Product added successfully!", "Success");
        this.router.navigate(['/products']);
      }),
      catchError((error) => {
        this.toastrService.error(`Failed!\n${error.error.message}`, "Error")
        this.addProductForm.reset();
        return of(null); 
      })
    ).subscribe();

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

   ngOnDestroy(): void {
    if (this.addProbSub$) {
      this.addProbSub$.unsubscribe();
    }
  }
}
