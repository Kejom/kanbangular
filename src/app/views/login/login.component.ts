import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms"
import { Router } from '@angular/router';
import { LoginData } from 'src/app/models/login-data.model';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar} from "@angular/material/snack-bar"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
    this.loginForm = new FormGroup({
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { validators: [Validators.required] })
    });
  }

  async onSubmit() {
    let loginData: LoginData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }

    try {
      await this.authService.loginUser(loginData);
      this.router.navigate(['/'])
    } catch (error) {
      this.snackBar.open("Invalid Email or Password provided", "Ok")
    }

  }
}
