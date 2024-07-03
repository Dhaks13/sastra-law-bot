// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getToken(): string {
    // Return the token from storage or any other source
    return 'your-auth-token';
  }
}
