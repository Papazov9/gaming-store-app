import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDTO } from '../Types';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  registerForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      phone: [''],
      age : ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      firstName: [''],
      lastName: ['']
    }, {
      validator: this.MustMatch('password', 'confirmPassword')
    });
  }

  register() {
    const user: UserDTO = {
      ...this.registerForm.value
    } 
    this.authService.register(user).subscribe({
      next: () => {
        this.toastrService.success("Registered successfully!", "Success");
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.toastrService.error(`Failed!\n ${error.error.message}`, "Error");
        this.registerForm.reset();
      }
    });    
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors?.['mustMatch']) {
        
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({mustMatch: true});
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
}
