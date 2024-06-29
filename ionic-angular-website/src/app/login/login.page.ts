import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInput } from '@ionic/angular';

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
  passwordTextType: string = 'password'; // Initial type for password fields
  passwordTextColor: string = 'black'; // Define passwordTextColor property

  @ViewChild('recaptchaElement', { static: false }) recaptchaElement!: ElementRef;

  constructor(private route: ActivatedRoute) {}

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

  submitForm() {
    // Handle your form submission here
    console.log('Form submitted');
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

  async togglePasswordVisibility(inputField: IonInput) {
    const inputElement = await inputField?.getInputElement?.();
    if (inputElement) {
      this.passwordTextType = this.passwordTextType === 'password' ? 'text' : 'password';
      this.togglePasswordTextColor(this.passwordTextType, inputElement.value);
    }
  }

  async toggleConfirmPasswordVisibility(inputField: IonInput) {
    const inputElement = await inputField?.getInputElement?.();
    if (inputElement) {
      this.passwordTextType = this.passwordTextType === 'password' ? 'text' : 'password';
      this.togglePasswordTextColor(this.passwordTextType, inputElement.value);
    }
  }

  togglePasswordTextColor(type: string, value: string) {
    this.passwordTextColor = type === 'password' && value === '' ? 'black' : '#666';
  }

  submitSignupForm() {
    // Handle your form submission here
    console.log('Sign Up form submitted');
  }
}
