import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoadingService } from '../services/loading.service';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service'; 


@Component({
  selector: 'app-rs',
  templateUrl: './rs.page.html',
  styleUrls: ['./rs.page.scss'],
})
export class RSPage {
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

  dash(){
    this.loading.setLoading(true);
    console.log('dashboard');
    this.router.navigate(['/dashboard']);
    this.loading.setLoading(false);
  }
  
  dss(){
    this.loading.setLoading(true);
    this.messages = [{ text: 'Hello, I am LegalGPT. How can I assist you today?', type: 'bot' }];
    console.log('dss');
    this.router.navigate(['/dss']);
    this.loading.setLoading(false);
  }
  
  lkb(){
    this.loading.setLoading(true);
    this.messages = [{ text: 'Hello, I am LegalGPT. How can I assist you today?', type: 'bot' }];
    console.log('chat');
    this.router.navigate(['/chat']);
    this.loading.setLoading(false);
  }
  

  
  sendMessage() {
    this.loading.setLoading(true);
    if (this.userMessage.trim()) {
      const text = this.userMessage;
      this.messages.push({ type: 'user' , text: this.userMessage });
      const options = {
        url: environment.API_URL + '/api/RecSys/',
        data: {text: text},
        callback: (response: any) => {
          this.loading.setLoading(false);
          if (response.success) {
            console.log('Response Generated Successfully');
            this.messages.push({ type: 'bot', text: response});
          } else {
            console.error('Chatbot Offline');
            this.messages.push({ type: 'bot', text: 'Sorry, I am unable to process your request at the moment. Please try again later.' });
          }
        }
      };
  
      this.apiService.apiCallHttpPost(options);
    
      this.userMessage = '';

      // Scroll to the bottom of the chat
      setTimeout(() => {
        const chatContainer = document.querySelector('.chat-container');
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      }, 0);
    }
    this.loading.setLoading(false);
  }

}