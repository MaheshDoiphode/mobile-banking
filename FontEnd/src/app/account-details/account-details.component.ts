import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  accountDetailsForm: FormGroup;
  user: any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private userService: UserService) { 
    this.accountDetailsForm = this.formBuilder.group({
      name: [''],
      email: [''],
      phoneNumber: [''],
      gender: [''],
      address: [''],
      dateOfBirth: [''],
      nationality: ['']
    });
  }

  ngOnInit() {
    this.userService.user.subscribe(user => {
      if (user) {
        this.user = user;
        this.accountDetailsForm.patchValue(user);
      }
    });
  }
  

  // onSubmit() {
  //   const updatedAccountDetails = {
  //     ...this.accountDetailsForm.value,
  //     UserID : this.userService.userValue.userID,
  //     ProfilePhoto: this.userService.userValue.profilePhoto,
  //   }
  //   this.http.put(`https://localhost:7211/UserManagement/UpdateUser`, updatedAccountDetails).subscribe((response: any) => {
  //     this.userService.user.next(response);
  //   });
  // }
  onSubmit() {
    const updatedAccountDetails = {
      ...this.accountDetailsForm.value,
      UserID : this.userService.user.value?.userID,
      ProfilePhoto: this.userService.user.value?.profilePhoto,
    }
    this.http.put(`https://localhost:7211/UserManagement/UpdateUser`, updatedAccountDetails).subscribe((response: any) => {
      this.user = response;
      // Update the property names in patchValue to match the response body
      this.accountDetailsForm.patchValue({
        name: response.name,
        email: response.email,
        phoneNumber: response.phoneNumber,
        gender: response.gender,
        address: response.address,
        dateOfBirth: new Date(response.dateOfBirth),
        nationality: response.nationality
      });
      // Update the user data in the UserService
      this.userService.user.next(response);
    });
  }
  

  onFileSelect(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const user = { ...this.userService.userValue, profilePhoto: reader.result as string };
        this.userService.user.next(user);
      };
      reader.readAsDataURL(file);
    }
  }
}
