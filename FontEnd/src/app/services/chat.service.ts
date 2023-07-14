import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private url = 'https://api.openai.com/v1/completions';
  private apiKey = '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';
  private conversationHistory: string[] = [];
  private repeatMode = false;

  constructor(private http: HttpClient) {}

  getResponse(userInput: string, conversationHistory: string[]) {    console.log('getResponse called with:', userInput);
    // Add the user's input to the conversation history
    this.conversationHistory.push(`User: ${userInput}`);

    // Check if the user has given a specific instruction
    if (userInput.toLowerCase() === 'after this response you will only repeat what i say') {
      this.repeatMode = true;
      this.conversationHistory.push('Bot: Okay, I will repeat what you say.');
      return Promise.resolve('Okay, I will repeat what you say.');
    }

    if (this.repeatMode) {
      this.conversationHistory.push(`Bot: ${userInput}`);
      return Promise.resolve(userInput);
    }

    // Create the prompt by joining the conversation history with line breaks
    const prompt = this.conversationHistory.join('\n');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    });

    const body = {
      model: 'text-davinci-003', // Adjust the model as needed
      prompt: conversationHistory.map(line => line.replace(/^Bot: /, '')).join('\n') + '\n' + prompt, // Remove the "Bot: " prefix
      max_tokens: 60,
      temperature: 0.8,
      n: 1,
    };

    console.log('Making API call with body:', body);
    return this.http
      .post<any>(this.url, body, { headers })
      .toPromise()
      .then((response) => {
        console.log('Got API response:', response);
        console.log('Choices array:', response.choices);
        console.log('First choice:', response.choices[0]);
        // Add the bot's response to the conversation history
        this.conversationHistory.push(`Bot: ${response.choices[0].text.trim()}`);
        return response.choices[0].text.trim();
      });
  }
}
