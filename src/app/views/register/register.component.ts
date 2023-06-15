import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms"
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', {validators: [Validators.required]}),
      lastName: new FormControl('', {validators: [Validators.required]}),
      email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      password: new FormControl('', {validators: [Validators.required]}),
      confirmPassword: new FormControl('', {validators: [Validators.required]}),
    })
  }

  async onSubmit(){
    let user: User = {
      email: this.registerForm.value.email,
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      role: 'developer',
      id: ""
    }

    await this.authService.registerUser(user, this.registerForm.value.password);
    this.router.navigate(["/"]);
  }
}
