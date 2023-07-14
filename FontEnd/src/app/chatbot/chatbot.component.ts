import { Component, OnInit, ChangeDetectorRef, Input, ViewChildren, QueryList, AfterViewInit, ElementRef } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit, AfterViewInit {
  @Input() dialogActive: boolean = false;
  messages: {text: string, sender: 'user' | 'bot'}[] = [];
  conversationHistory: string[] = [];
  @ViewChildren('message') messageElements!: QueryList<any>;

  constructor(private chatService: ChatService, private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {}

  ngAfterViewInit() {
    this.messageElements.changes.subscribe(_ => this.scrollToBottom());
  }

  async sendMessage(userInput: string) {
    if (userInput.trim() !== '') {
      this.messages.push({text: userInput, sender: 'user'});
      this.conversationHistory.push(`User: ${userInput}`);
      try {
        const botResponse = await this.chatService.getResponse(userInput, this.conversationHistory);
        this.messages.push({ text: botResponse, sender: 'bot' });
        this.conversationHistory.push(`Bot: ${botResponse}`);
      } catch (error) {
        console.error('Error getting response from bot:', error);
      }
      this.cdr.detectChanges();
    }
  }

  toggleChatbot() {
    this.dialogActive = !this.dialogActive;
  }

  scrollToBottom(): void {
    try {
      this.messageElements.last.nativeElement.scrollIntoView();
    } catch(err) { }
  }
}
