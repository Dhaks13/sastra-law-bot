import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxCaptchaModule } from 'ngx-captcha'; // Import NgxCaptchaModule

import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    NgxCaptchaModule // Include NgxCaptchaModule here
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
