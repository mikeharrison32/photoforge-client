import { Component, HostBinding, OnInit } from '@angular/core';
import { LoadingService } from '../core/services/loading.service';

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.scss'],
})
export class LoadingPageComponent implements OnInit {
  isLoading: boolean = false;
  message: string = '';
  constructor(private loadingService: LoadingService) {}
  @HostBinding('*ngIf')
  ngOnInit(): void {
    this.loadingService.options.subscribe((options) => {
      this.isLoading = options.isLoading;
      this.message = options.message || 'Loading...';
    });
  }
}
