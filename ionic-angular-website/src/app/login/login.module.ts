import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxCaptchaModule } from 'ngx-captcha'; // Import NgxCaptchaModule
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
