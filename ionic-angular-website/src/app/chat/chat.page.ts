import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage {
  decisionResult: string = '';

  constructor(private router: Router) {
    this.decisionResult = '';
  }

  logout() {
    // Implement logout functionality
    this.router.navigate(['/home']);
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      // Handle file upload logic
    }
  }

  processFile() {
    // Implement file processing logic and set the decisionResult
    this.decisionResult = "APPEAL(S) ALLOWED with a probability score of 86.03%";
  }
}
