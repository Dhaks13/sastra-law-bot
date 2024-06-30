import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderComponent } from 'src/app/components/loader/loader.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  loading: Boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    console.log('Home Page');
  }

  signIn(){
    console.log('Sign In');
    this.router.navigate(['/login'], { queryParams: { isSignIn: true } });
  }

  signUp(){
    console.log('Sign Up');
    this.router.navigate(['/login'], { queryParams: { isSignIn: false } });
  }

}
