import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    const user: {username: string, password: string} = {
      ...this.loginForm.value
    }
    this.authService.login(user.username, user.password).subscribe({
      next: () => {
        this.router.navigate(['/home']);
        this.toastrService.success("Logged in successfully!", "Success");
      },
      error: (error) => {
        console.log("Login failed!", error);
        this.toastrService.error(`Failed!\n ${error.error.message}`, "Error");
      }
    })
  }
}
