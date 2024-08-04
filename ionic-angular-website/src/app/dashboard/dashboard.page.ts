import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoadingService } from '../services/loading.service';
import { ApiService } from '../services/api.service'; 


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
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
    console.log('Dashboard Page');
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
  
  dss(){
    this.loading.setLoading(true);
    console.log('dss');
    this.router.navigate(['/dss']);
    this.loading.setLoading(false);
  }

  lkb(){
    this.loading.setLoading(true);
    console.log('chat');
    this.router.navigate(['/chat']);
    this.loading.setLoading(false);
  }

  rs(){
    this.loading.setLoading(true);
    console.log('rs');
    this.router.navigate(['/rs']);
    this.loading.setLoading(false);
  }

}
