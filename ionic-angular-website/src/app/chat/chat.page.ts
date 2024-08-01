import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoadingService } from '../services/loading.service';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service'; 


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage {
  decisionResult: string = '';
  selectedFile: File | null = null;
  userMessage: string = '';
  messages: { text: string; type: string }[] = [{ text: 'Hello, I am LegalGPT. How can I assist you today?', type: 'bot' }];
  username: string = 'Guest';
  constructor(private loading: LoadingService ,private cookieService: CookieService ,private route: ActivatedRoute, private router: Router,private apiService: ApiService) {
    this.loading.setLoading(true);
    this.username = this.getUsernameFromCookie();
    if(this.getUsernameFromCookie()==''){
        this.router.navigate(['/home']);
    }
    this.loading.setLoading(false);
  }

  ngOnInit() {
    this.loading.setLoading(true);
    this.username = this.getUsernameFromCookie();
    this.loading.setLoading(false);
  }  

  getUsernameFromCookie() {
    return this.cookieService.get('username');
  }

  logout() {
    // Implement logout functionality
    this.cookieService.delete('username');
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

  async processFile() {
    this.loading.setLoading(true);
  
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
  
      const options = {
        url: environment.API_URL + '/api/pdfextract/',
        data: formData,
        callback: (response: any) => {
          this.loading.setLoading(false);
          if (response.success) {
            console.log('File read successful');
            this.decisionResult = response.extractedText || 'Text extraction succeeded, but no text returned.';
          } else {
            console.error('File read failed');
            this.decisionResult = 'File read failed.';
          }
        }
      };
  
      this.apiService.apiCallHttpPost(options);
    } else {
      this.decisionResult = 'No file selected.';
      this.loading.setLoading(false);
    }
  }
  

  
  sendMessage() {
    if (this.userMessage.trim()) {
      this.messages.push({ type: 'user' , text: this.userMessage });
      
      this.userMessage = '';

      // Scroll to the bottom of the chat
      setTimeout(() => {
        const chatContainer = document.querySelector('.chat-container');
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      }, 0);
    }
  }
}