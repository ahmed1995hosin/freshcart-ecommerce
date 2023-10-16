import { Component } from '@angular/core';

@Component({
  selector: 'app-preloading',
  templateUrl: './preloading.component.html',
  styleUrls: ['./preloading.component.css'],
})
export class PreloadingComponent {
  isLoading: boolean = false;
}
