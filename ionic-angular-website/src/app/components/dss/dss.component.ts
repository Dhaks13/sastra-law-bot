import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { ApiService } from '../../services/api.service'; 
@Component({
  selector: 'app-dss',
  templateUrl: './dss.component.html',
  styleUrls: ['./dss.component.scss'],
})
export class DssComponent {
    decisionResult: string = '';
      selectedFile: File | null = null;
      username: string = 'Guest';
      public isloading: boolean = false;
      constructor(public loading: LoadingService ,private cookieService: CookieService ,private apiService: ApiService) {
        this.loading.setLoading(true);
        this.username = this.getUsernameFromCookie();
        if(this.getUsernameFromCookie()==''){
        }
        this.loading.setLoading(false);
      }
    
      ngOnInit() {
        this.loading.setLoading(true);
        this.username = this.getUsernameFromCookie();
        this.loading.setLoading(false);
      }  
    
      getUsernameFromCookie() {
        return this.cookieService.get('username');
      }
    
    
      onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
          this.selectedFile = input.files[0];
        }
        this.decisionResult = '';
      }
    
      onDrop(event: DragEvent) {
        event.preventDefault();
        if (event.dataTransfer && event.dataTransfer.files.length > 0) {
          this.selectedFile = event.dataTransfer.files[0];
        }
      }
    
      onDragOver(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        (event.target as HTMLElement).classList.add('dragover');
      }
    
      onDragLeave(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        (event.target as HTMLElement).classList.remove('dragover');
      }
    
      removeFile() {
        this.selectedFile = null;
        this.decisionResult = '';
      }
    
      async processFile() {
        this.loading.setLoading(true);
        this.isloading = true;
        this.decisionResult = 'loading.....';
        if (this.selectedFile) {
          const formData = new FormData();
          formData.append('file', this.selectedFile);
      
          const options = {
            url: environment.API_URL + '/api/pdfextract/',
            data: formData,
            callback: (response: any) => {
              if (response.success) {
                console.log('File read successful');
                this.decisionResult = response.data.response || 'Text extraction succeeded, but no text returned.';
              } else {
                console.error('File read failed');
                this.decisionResult = 'File read failed.';
              }
            }
          };
      
          this.apiService.apiCallHttpPost(options);
        } else {
          this.decisionResult = 'No file selected.';
    
        }
        this.loading.setLoading(false);
        this.isloading = false;
      }
    
}