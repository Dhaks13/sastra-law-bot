import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  constructor() {}

  ngOnInit() {
    console.log('Home Page');
  }

  signIn(){
    console.log('Sign In');
  }

  signUp(){
    console.log('Sign Up');
  }

}
