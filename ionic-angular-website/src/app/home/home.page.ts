import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  constructor(private router: Router, private loading: LoadingService) {}

  ngOnInit() {
    console.log('Home Page');
    this.loading.setLoading(false);
  }

  signIn(){
    this.loading.setLoading(true);
    console.log('Sign In');
    this.router.navigate(['/login'], { queryParams: { isSignIn: true } });
    this.loading.setLoading(false);
  }

  signUp(){
    this.loading.setLoading(true);
    console.log('Sign Up');
    this.router.navigate(['/login'], { queryParams: { isSignIn: false } });
    this.loading.setLoading(false);
  }

}
