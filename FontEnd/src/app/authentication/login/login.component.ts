import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userAuthenticated: boolean = false;
  loginForm = this.fb.group({
    emailId: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        //Validators.pattern('^(?=.*[a-zA-Z])(?=.*d)[a-zA-Zd]{6,}$'),
      ],
    ],
    otpfield: [''],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  getOTP() {
    const email = this.loginForm.get('emailId')?.value;
    const password = this.loginForm.get('password')?.value;
    if (email && password) {
      this.userService.getOTP(email, password).subscribe();
      console.log("Cred good");
    } else {
      console.error('email or password is undefined');
    }
  }

  verifyOTP() {
    const otp = this.loginForm.get('otpfield')?.value;
    const jwt = this.userService.userValue.jwt;
    if (jwt && otp) {
      this.userService.verifyOTP(jwt, otp).subscribe((response) => {
        if (response == 'Valid') {
          console.log("user validated with otp");
          this.userAuthenticated = true;
        }
      });
    } else {
      console.error('userID or otp is undefined');
    }
  }
  onSubmit() {
    console.log('onsubmit method');
    if (this.userAuthenticated) {
      console.log("Going to dashboard");
      this.router.navigate(['/dashboard']);
    }
  }
}
