import { Component, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CreatearrayPipe } from 'src/app/pipes/createarray.pipe';
import { CuttitlePipe } from 'src/app/pipes/cuttitle.pipe';
import { IshalfPipe } from 'src/app/pipes/ishalf.pipe';
import { RoundPipe } from 'src/app/pipes/round.pipe';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
  standalone: true,
  imports: [
    BrowserModule,
    AppRoutingModule,
    CuttitlePipe,
    RatingComponent,
    RoundPipe,
    CreatearrayPipe,
    IshalfPipe,
  ],
})
export class RatingComponent {
  @Input() rating: number = 0;
  // roundValue: number = 0;
  constructor() {
    // this.roundValue = Math.trunc(this.rating);
    // console.log('this.roundValue');
    // console.log(this.roundValue);
  }
}
