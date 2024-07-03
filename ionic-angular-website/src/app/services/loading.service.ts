import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading: boolean = false;

  setLoading(isLoading: boolean): void {
    this.loading = isLoading;
  }

  isLoading(): boolean {
    return this.loading;
  }
}
