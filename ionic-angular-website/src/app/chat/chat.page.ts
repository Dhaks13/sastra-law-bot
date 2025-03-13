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
  active_index: number = -1;
  title_id: number = -1;
  chats: any = [];
  userMessage: string = '';
  messages: { id: number, text: string; type: string }[] = [{id:-1 , text: 'Hello, I am Legal Law Bot. How can I assist you today ?', type: 'bot' }];
  username: string = 'Guest';
  isloading: boolean = false;
  voted: Array<boolean> = [true];
  constructor(public loading: LoadingService ,private cookieService: CookieService ,private route: ActivatedRoute, private router: Router,private apiService: ApiService) {
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
    if(this.getUsernameFromCookie()==''){
        this.router.navigate(['/home']);
    }
    this.getChats(this.username, 1);
    this.active_index = -1;
    this.title_id = -1;
    this.loading.setLoading(false);
  }  

  getChats(user: string, chat_type: number) {
    this.loading.setLoading(true);
    const options = {
      url: environment.API_URL + '/api/getchats/',
      data: { user: user, chat_type: chat_type },
      callback: (response: any) => {
        this.loading.setLoading(false); // Hide the loader
        this.isloading = false;
        if (response.success) {
          this.chats = response.data;
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
    this.active_index = -1;
    this.title_id = -1;
    console.log('dashboard');
    this.router.navigate(['/dashboard']);
    this.loading.setLoading(false);
  }
  
  
  // dss(){
  //   this.loading.setLoading(true);
  //   console.log('dss');
  //   this.router.navigate(['/dss']);
  //   this.loading.setLoading(false);
  // }
  
  rs(){
    this.loading.setLoading(true);
    this.messages = [{ id:-1,text: 'Hello, I am Legal Law Bot. How can I assist you today ?', type: 'bot' }];
    this.active_index = -1;
    this.title_id = -1;
    console.log('rs');
    this.router.navigate(['/rs']);
    this.loading.setLoading(false);
  }

  sendMessage() {
    this.loading.setLoading(true); // Show the loader
    this.isloading = true;
    var element = document.querySelector(".messages");
    if (this.userMessage.trim()) {
      const text = this.userMessage;
      this.messages.push({id:-1, type: 'user', text: this.userMessage });
      
      if (element) {
        var top = element.scrollHeight;
        console.log(top);
        element.scrollTop = top;
    }  
    
      const options = {
        url: environment.API_URL + '/api/lawbot/',
        data: { user: this.username, text: text, title_id: this.title_id },
        callback: (response: any) => {
          this.loading.setLoading(false); // Hide the loader
          this.isloading = false;
          if (response.success) {
            console.log('Chatbot Response:', response.data.response); 
            this.messages.push({id:response.data.id, type: 'bot', text: response.data.response });
            this.voted.push(false);
            this.title_id = response.data.title_id;
            this.getChats(this.username, 1);
            this.active_index = 0;
           
          } else {
            console.error('Chatbot Offline');
            this.messages.push({id: -1, type: 'bot', text: 'Sorry, I am unable to process your request at the moment. Please try again later.' });
          }
          if (element) {
            var top = element.scrollHeight;
            console.log(top);
            element.scrollTop = top;
        }
        },
        errorcall: (error: any) => {
          this.loading.setLoading(false); // Hide the loader
          this.isloading = false;
          console.error('Server Error:', error);
          this.messages.push({id:-1, type: 'bot', text: 'Sorry, there was an error processing your request. Please try again later.' });
          if (element) {
            var top = element.scrollHeight;
            console.log(top);
            element.scrollTop = top;
        }
        }
      };
      // Make the API call
      this.apiService.apiCallHttpPost(options);
  
      // Clear the user message input
      this.userMessage = '';
      if (element) {
        var top = element.scrollHeight;
        element.scrollTop = top;
    }    
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
  
  isActive(index: number): boolean {
    return this.active_index === index;
  }

  loadChat(id: number,active: number){
    this.loading.setLoading(true); // Show the loader
    this.isloading = true
    if (id==-1){
      this.messages = [{id:-1 , text: 'Hello, I am Legal Law Bot. How can I assist you today ?', type: 'bot' }];
      this.loading.setLoading(false); // Hide the loader
      this.isloading = false;
      this.title_id = id;
      this.active_index = active;
      return;
    }
    const options = {
      url: environment.API_URL + '/api/loadChat/',
      data: {id: id },
      callback: (response: any) => {
        this.loading.setLoading(false); // Hide the loader
        this.isloading = false;
        this.messages = [{id:-1 , text: 'Hello, I am Legal Law Bot. How can I assist you today ?', type: 'bot' }];
        this.voted = [true];
        if (response.success) {
          this.title_id = id;
          for (let i = 0; i < response.data.length; i++) {
            this.messages.push({id:response.data[i].chat_id, type: 'user', text: response.data[i].user_message });
            this.voted.push(true);
            this.messages.push({id:response.data[i].chat_id, type: 'bot', text: response.data[i].gpt_message });
            if (response.data[i].vote!=0){
              this.voted.push(true)
            }
            else{
              this.voted.push(false);
            }
          }
          this.getChats(this.username, 1);
        }
      }
    };
    this.apiService.apiCallHttpPost(options);
    this.title_id = id;
    this.active_index = active;
    this.loading.setLoading(false); // Hide the loader
    this.isloading = false;
    return
  }
}