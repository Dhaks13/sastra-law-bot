import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  constructor(private loadingService: LoadingService) {}

  isLoading(): boolean {
    return this.loadingService.isLoading();
  }
}
