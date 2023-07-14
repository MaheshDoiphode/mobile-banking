import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; // Import the toastr service
import { TransferService } from '../services/transfer.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent {
  transferData = {
    senderId: '',
    accountNumber: '',
    ifscCode: '',
    paymentType: '',
    amount: 0
  };

  constructor(
    private transfer: TransferService,
    private toastr: ToastrService, 
    private userService : UserService
  ) {}

  submitTransferForm() {
    // Prepare the request body
    const requestBody = {
      userID: this.userService.userValue.userID,
      transactions: [
        {
          receiverID: this.transferData.senderId,
          accountNumber: this.transferData.accountNumber,
          amount: this.transferData.amount,
          ifscCode: this.transferData.ifscCode,
          paymentType: this.transferData.paymentType
        }
      ]
    };

    console.log(requestBody);
    // Call the API
    this.transfer.createTransaction(requestBody).subscribe(
      response => {
        console.log('Response:', response); // Log the response
        // If the transaction is successful, show a success toast
        if (response == 'Transaction is successful.') {
          this.toastr.success(response);
        } else {
          // If the transaction failed, show an error toast
          this.toastr.error('Something went wrong!! Check the Details and try again!!');
        }
      },
      error => {
        // If there's an error with the API call, show an error toast
        this.toastr.error('Error with transaction');
      }
    );    
  }
}
