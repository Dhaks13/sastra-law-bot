import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage {
  decisionResult: string = '';
  selectedFile: File | null = null;
  userMessage: string = '';
  messages: { content: string; sender: string }[] = [];

  constructor(private router: Router) {
    this.decisionResult = '';
  }

  logout() {
    // Implement logout functionality
    this.router.navigate(['/home']);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.selectedFile = event.dataTransfer.files[0];
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    (event.target as HTMLElement).classList.add('dragover');
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    (event.target as HTMLElement).classList.remove('dragover');
  }

  removeFile() {
    this.selectedFile = null;
  }


  processFile() {
    // Implement file processing logic and set the decisionResult
    this.decisionResult = "APPEAL(S) ALLOWED with a probability score of 86.03%";
  }

  sendMessage() {
    if (this.userMessage.trim()) {
      this.messages.push({ content: this.userMessage, sender: 'user' });
      this.userMessage = '';
      this.getBotResponse();
    }
  }

  getBotResponse() {
    // Simulate a bot response
    setTimeout(() => {
      this.messages.push({ content: 'This is a simulated bot response.', sender: 'bot' });
    }, 1000);
  }
}
