import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginPageModule } from './login/login.module'; // Ensure you import LoginPageModule

// Import RecaptchaModule and RecaptchaFormsModule
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    LoginPageModule,
    RecaptchaModule,
    RecaptchaFormsModule // Import RecaptchaFormsModule here
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
