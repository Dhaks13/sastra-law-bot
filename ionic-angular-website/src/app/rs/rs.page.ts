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
  messages: { id: number, text: string; type: string }[] = [{id:-1 , text: 'Hello, I am Legal Law Bot. How can I assist you today ?', type: 'bot' }];
  voted: Array<boolean> = []; 
  username: string = 'Guest';
  isloading: boolean = false;
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
    this.messages = [{id:-1, text: 'Hello, I am a Legal Advisor. Ask your query on Family & Property Dispute ?', type: 'bot' }];
    console.log('dss');
    this.router.navigate(['/dss']);
    this.loading.setLoading(false);
  }
  
  lkb(){
    this.loading.setLoading(true);
    this.messages = [{ id:-1, text: 'Hello, I am a Legal Advisor. Ask your query on Family & Property Dispute ?', type: 'bot' }];
    console.log('chat');
    this.router.navigate(['/chat']);
    this.loading.setLoading(false);
  }
  

  sendMessage() {
    this.loading.setLoading(true); // Show the loader
    this.isloading = true;
    if (this.userMessage.trim()) {
      const text = this.userMessage;
      this.messages.push({id:-1, type: 'user', text: this.userMessage });
  
      const options = {
        url: environment.API_URL + '/api/RecSys/',
        data: { user: this.username, text: text },
        callback: (response: any) => {
          this.loading.setLoading(false); // Hide the loader
          this.isloading = false;
          if (response.success) {
            console.log('Chatbot Response:', response.data.response); 
            this.messages.push({id:response.data.id, type: 'bot', text: response.data.response });
            this.voted.push(false);
          } else {
            console.error('Chatbot Offline');
            this.messages.push({id: -1, type: 'bot', text: 'Sorry, I am unable to process your request at the moment. Please try again later.' });
          }
        },
        errorcall: (error: any) => {
          this.loading.setLoading(false); // Hide the loader
          this.isloading = false;
          console.error('Server Error:', error);
          this.messages.push({id:-1, type: 'bot', text: 'Sorry, there was an error processing your request. Please try again later.' });
        }
      };
  
      // Make the API call
      this.apiService.apiCallHttpPost(options);
  
      // Clear the user message input
      this.userMessage = '';
  
      // Scroll to the bottom of the chat
      setTimeout(() => {
        const chatContainer = document.querySelector('.chat-container');
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      }, 0);
    } else {
      this.loading.setLoading(false); // Hide the loader if no message is provided
    }
  }

  copyText(id: string): void {
    const range = document.createRange();
    const elements = document.getElementsByClassName(id);
  
    if (elements.length > 0) {
      const element = elements[0];
      if (element.nodeType === Node.ELEMENT_NODE) {
        range.selectNode(element);
        const selection = window.getSelection();
  
        if (selection) {
          selection.removeAllRanges(); // clear current selection
          selection.addRange(range); // to select text
        }
  
        document.execCommand("copy"); // perform the copy action
        if (selection) {
          selection.removeAllRanges(); // deselect
        }
      }
    } else {
      console.error('Element with class', id, 'not found.');
    }
  }
  

  vote(i:number, id: number, value: number) {
    const options = {
      url: environment.API_URL + '/api/vote/',
      data: { user: this.username, id: id, value: value },
      callback: (response: any) => {
        this.loading.setLoading(false); // Hide the loader
        this.isloading = false;
        if (response.success) {
          console.log('Vote sucess:', id, value);
          this.voted[i] = true;
        } else {
          console.error('Vote Error');  
        }
      },
      errorcall: (error: any) => {
        this.loading.setLoading(false); // Hide the loader
        this.isloading = false;
        console.error('Server Error:', error);
      }
    };
    this.apiService.apiCallHttpPost(options);
    
  }
 
}