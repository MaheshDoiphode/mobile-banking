import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  profilePhoto: string;
  type = 'text';
  eyeIcon = 'fa-eye';

  formInitialized = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.signupForm = this.fb.group({});
    this.profilePhoto = '';
  }

  ngOnInit() {
    this.signupForm = this.fb.group({
      userID : [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      nationality: ['Indian'],
      profilePhoto: [''],
      registrationDate: [new Date().toISOString()],
      registrationIP: ['']
    });
    this.formInitialized = true;
    this.getIPAddress();
  }

  onSignUp() {
    console.log('Form value:', this.signupForm.value);
    console.log('Form status:', this.signupForm.status);
    if (this.signupForm.valid) {
      console.log('Sending signup request with data:', this.signupForm.value);
      this.http.post('https://localhost:7211/UserManagement/RegisterUser', this.signupForm.value)
        .subscribe(() => {
          console.log('Signup request successful');
          this.router.navigate(['/authentication/login']);
        }, error => {
          console.error('Signup request failed with error:', error);
        });
    } else {
      console.error('Signup form is not valid:', this.signupForm.errors);
    }
  }
  

  onProfilePhotoSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePhoto = reader.result as string;
        this.signupForm.patchValue({ profilePhoto: this.profilePhoto });
      };
      reader.readAsDataURL(file);
    }
  }
  

  

  getIPAddress() {
    this.http.get<{ip:string}>('https://api.ipify.org?format=json')
      .subscribe(data => {
        this.signupForm.patchValue({ registrationIP: data.ip });
      });
  }
  hideShowPass() {
    this.type = this.type === 'password' ? 'text' : 'password';
    this.eyeIcon = this.eyeIcon === 'fa-eye' ? 'fa-eye-slash' : 'fa-eye';
  }
}
