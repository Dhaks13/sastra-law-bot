import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service'; // Adjust the path to your API service


declare var grecaptcha: any; // Declare grecaptcha to avoid TypeScript errors

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  isSignIn: boolean = true;
  captchaResolved: boolean = false;
  buttonDisabled: boolean = true; // Initially disable button
  siteKey: string = '6LeP-gMqAAAAAKBnPq-tjdPwYuJIz6k-dldJOPul'; // Replace with your reCAPTCHA v3 site key
  password: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  Username = '';
  signupForm: FormGroup;
  signinForm: FormGroup;
  emailExists: boolean = false;
  usernameExists: boolean = false;
  @ViewChild('recaptchaToken', { static: true }) recaptchaToken!: ElementRef;
  @ViewChild('recaptcha', { static: true }) recaptcha!: ElementRef;
  @ViewChild('recaptchaElement', { static: false }) recaptchaElement!: ElementRef;
  @ViewChild('UsernameInput', { static: true }) UsernameInput!: IonInput;
  
  constructor(private route: ActivatedRoute,private fb: FormBuilder,private http: HttpClient,private apiService: ApiService) {
    this.signinForm = this.fb.group({
      username: ['', Validators.required],
      password: ['',[Validators.required, Validators.minLength(8)]]
    });
    this.signupForm = this.fb.group({
      username: ['', Validators.required, Validators.minLength(3), Validators.maxLength(20), this.usernameExists],
      email: ['', [Validators.required, Validators.email], this.emailExists],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  
  
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.isSignIn = params['isSignIn'] === 'true';
    });
  }
  
  ngAfterViewInit() {
    // Initialize reCAPTCHA v3
    this.loadReCaptcha();
  }
  
  loadReCaptcha() {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${this.siteKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      grecaptcha.ready(() => {
        this.executeReCaptcha();
      });
    };
    document.body.appendChild(script);
  }
  
  executeReCaptcha() {
    grecaptcha.execute(this.siteKey, { action: 'login' }).then((token: string) => {
      console.log('reCAPTCHA token:', token);
      this.resolvedCaptcha(token);
    });
  }

  resolvedCaptcha(token: string) {
    if (token) {
      this.captchaResolved = true;
      this.buttonDisabled = false; // Enable button once captcha is resolved
    }
  }
  
  onInput_username(ev: any) {
  const value = ev.target!.value;
  
  // Removes non alphanumeric characters
    const filteredValue = value.replace(/[^a-zA-Z0-9_]+/g, '');

    /**
     * Update both the state variable and
     * the component to keep them in sync.
     */
    this.signupForm.patchValue({ username: filteredValue });
    const options = {
      url: environment.API_URL + '/api/ValidateUsername/',
      data: { username: filteredValue },
      callback: (response: any) => {
        if (response.success) {
          console.log('Username is available');
        } else {
          console.error('Username is already taken');
        }
      }
    };
    this.apiService.apiCallHttpPost(options);
  }

  onInput_email(ev: any) {
    const value = ev.target!.value;
    const options={
      url:environment.API_URL + '/api/ValidateEmail/',
      data:{email:value},
      callback:(response:any)=>{
        if(response.success){
          console.log('Email is available');
        }else{
          console.error('Email is already taken');
        }
      }
    };
    this.apiService.apiCallHttpPost(options);
  }

  toggleView() {
    this.isSignIn = !this.isSignIn;
    this.resetCaptcha();
    setTimeout(() => {
      // Re-initialize reCAPTCHA v3
      this.executeReCaptcha();
    }, 500); // Adjust timeout as needed
  }
  
  resetCaptcha() {
    this.captchaResolved = false;
    this.buttonDisabled = true; // Disable button when captcha is reset
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  submitSignupForm() {
    // Handle your form submission here
    // if (this.signupForm.valid) {
    //   const options = {
    //     url: environment.API_URL + '/authentication/validate_recaptcha/',
    //     data: {
    //       token: this.signupForm.value.recaptchaToken,
    //       action: 'signup'
    //     },
    //     callback: (response: any) => {
    //       console.log('Signup response:', response);
    //       // Handle signup response here, e.g., show success message, redirect, etc.
    //     }
    //   };

    //   this.apiService.apiCallHttpPost(options);
    // }

  }


  submitSignInForm() {
    // Handle your form submission here
    if (this.signinForm.valid) {
      // const options = {
      //   url: environment.API_URL + '/authentication/validate_recaptcha/',
      //   data: {
      //     token: this.signinForm.value.recaptchaToken,
      //     action: 'login'
      //   },
      //   callback: (response: any) => {
      //     console.log('Signin response:', response);
      //     // Handle signup response here, e.g., show success message, redirect, etc.
      //   }
      // };

      // this.apiService.apiCallHttpPost(options);
    }
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }
}
