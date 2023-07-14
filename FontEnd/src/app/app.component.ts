

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChatbotComponent } from './chatbot/chatbot.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mobile-banking-v1';
  constructor(public dialog: MatDialog) { }
  dialogActive: boolean = false;

  openChatbot() {
    this.dialog.open(ChatbotComponent, {
      width: '400px' // Adjust the width as needed
    });
  }
  toggleChatbot() {
    this.dialogActive = !this.dialogActive;
  }
}
