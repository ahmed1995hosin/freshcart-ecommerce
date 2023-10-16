import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Spinkit } from 'ng-http-loader';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private _LoadingService: LoadingService) {}
  isLoading: boolean = false;

  title = 'ecommerce';
  ngOnInit(): void {
    this._LoadingService.loading.subscribe({
      next: (load) => {
        this.isLoading = load;
      },
    });
  }
}
