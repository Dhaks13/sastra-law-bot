import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  apiCallHttpPost(options: any) {
    const { url, data, callback, errorcall } = options;

    this.http.post(url, data).subscribe(
      (response: any) => {
        if (callback) {
          callback(response);
        }
      },
      (error: any) => {
        console.error('Error:', error);
        errorcall(error);
        // Optionally handle error
      }
    );  
  }

}
