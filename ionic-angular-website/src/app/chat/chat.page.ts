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
  chats: any = [];
  active_index: number = -1;
  title_id: number = -1;
  username: string = 'Guest';
  isloading: boolean = false;
  isDark: boolean = false;
  selectedChatbot: string = 'law';  
  dropdownOpen: boolean = false;
  nav: boolean = false;

  constructor(public loading: LoadingService ,private cookieService: CookieService ,private route: ActivatedRoute, private router: Router,private apiService: ApiService) {
    this.loading.setLoading(true);
    // this.username = this.getUsernameFromCookie();
    // if(this.getUsernameFromCookie()==''){
    //     this.router.navigate(['/home']);
    // }
    this.loading.setLoading(false);
  }

  ngOnInit() {
    this.loading.setLoading(true);
    this.username = this.getUsernameFromCookie();
    // if(this.getUsernameFromCookie()==''){
    //     this.router.navigate(['/home']);
    // }
    this.loading.setLoading(false);
  } 
  
  toggleNav() {
    this.nav = !this.nav;
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    document.getElementById('container')?.classList.toggle('dark', this.isDark);
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
  }

  isActive(index: number): boolean {
    return this.active_index === index;
  }

  
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectChatbot(model: string) {
    this.selectedChatbot = model;
    this.dropdownOpen = false; // close after select
  }

  getChatbotName(model: string): string {
    switch (model) {
      case 'law': return 'Law ChatBot';
      case 'pdb': return 'Property Dispute Bot';
      case 'dss': return 'Decision Support System';
      default: return 'Select ChatBot';
    }
  }

  getUsernameFromCookie() {
    return this.cookieService.get('username');
  }

  logout() {
    // Implement logout functionality
    this.cookieService.delete('username');
    this.router.navigate(['/home']);
  }

  // dash(){
  //   this.loading.setLoading(true);
  //   this.active_index = -1;
  //   this.title_id = -1;
  //   console.log('dashboard');
  //   this.router.navigate(['/dashboard']);
  //   this.loading.setLoading(false);
  // }
  
  
  // dss(){
  //   this.loading.setLoading(true);
  //   console.log('dss');
  //   this.router.navigate(['/dss']);
  //   this.loading.setLoading(false);
  // }
  
  // rs(){
  //   this.loading.setLoading(true);
  //   this.messages = [{ id:-1,text: 'Hello, I am Legal Law Bot. How can I assist you today ?', type: 'bot' }];
  //   this.active_index = -1;
  //   this.title_id = -1;
  //   console.log('rs');
  //   this.router.navigate(['/rs']);
  //   this.loading.setLoading(false);
  // }

  
}