import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignIn } from '../../models/sign-in';
import { SignInService } from '../../services/sign-in.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  signin: SignIn = new SignIn();
  isSignUp: boolean = false;
  passwordFieldType: string = 'password';
  constructor(private router: Router, private signInService: SignInService) {}

  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  toggleAuthMode() {
    this.isSignUp = !this.isSignUp;
  }

  togglePasswordVisibility() {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  onSubmit() {
    this.signin.userName = this.loginForm.get('userName')?.value as string;
    this.signin.password = this.loginForm.get('password')?.value as string;
    if (this.isSignUp) {
      this.signInService.signUp(this.signin).subscribe({
        next: (data) => {
          this.isSignUp = false;
          this.loginForm.reset();
          this.router.navigateByUrl('auth');
        },
        error: (err) => {
          alert(err);
        },
      });
    } else {
      this.signInService.signIn(this.signin).subscribe({
        next: (data) => {
          this.signInService.storeToken(data);
          this.router.navigateByUrl('auth');
        },
        error: (err) => {
          alert(err);
        },
      });
    }
  }
}
