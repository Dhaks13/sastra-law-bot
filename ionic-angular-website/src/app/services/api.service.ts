import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  apiCallHttpPost(options: any) {
    const { url, data, callback } = options;

    this.http.post(url, data).subscribe(
      (response: any) => {
        if (callback) {
          callback(response);
        }
      },
      (error: any) => {
        console.error('Error:', error);
        // Optionally handle error
      }
    );
  }

}
