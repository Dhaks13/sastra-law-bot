import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
    isSignIn: boolean = true;

    constructor(private route: ActivatedRoute) {
      this.route.queryParams.subscribe(params => {
        if (params['isSignIn'] !== undefined) {
          this.isSignIn = params['isSignIn'] === 'true';
        }
      });
    }
  
    toggleView() {
      this.isSignIn = !this.isSignIn;
    }
    
    ngOnInit() {
        console.log('Login Page');
    }
}