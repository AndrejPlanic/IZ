import { Component } from '@angular/core';
import { ChatbotService } from '../../services/chatbot';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.html',
  styleUrls: ['./chatbot.css'],
  standalone: false,
})
export class Chatbot {
  chatOpen = false;

  toggleChat() {
    this.chatOpen = !this.chatOpen;
  }
  messages: { sender: 'user' | 'bot'; text: string }[] = [];
  inputMessage = '';

  constructor(private chatbotService: ChatbotService) {}

  async sendMessage() {
    const question = this.inputMessage.trim();
    if (!question) return;

    this.messages.push({ sender: 'user', text: question });
    this.inputMessage = '';

    try {
      const response = await this.chatbotService.askQuestion(question);
      this.messages.push({ sender: 'bot', text: response });
    } catch {
      this.messages.push({ sender: 'bot', text: 'Greška u vezi sa serverom.' });
    }
  }
}
