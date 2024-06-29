import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}

  ngOnInit() {
    console.log('Home Page');
  }

  signIn(){
    console.log('Sign In');
    this.router.navigate(['/login'], { queryParams: { isSignIn: true } });
  }

  signUp(){
    this.router.navigate(['/login'], { queryParams: { isSignIn: false } });
  }

}
