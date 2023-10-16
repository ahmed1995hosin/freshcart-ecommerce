import { Component, Input } from '@angular/core';
import { CuttitlePipe } from 'src/app/pipes/cuttitle.pipe';
import { CartService } from 'src/app/services/cart.service';
import { AuthenticationService } from 'src/app/services/authentication-service.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

import { HearticonComponent } from '../hearticon/hearticon.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrls: ['./singleproduct.component.css'],
  standalone: true,
  imports: [
    CuttitlePipe,
    FormsModule,
    CommonModule,
    HearticonComponent,
    RouterLink,
  ],
})
export class SingleproductComponent {
  @Input() product: any = {};
  @Input() wishListId: string[] = [];
  holdService: any;

  constructor(
    private _CartService: CartService,
    private toastr: ToastrService,
    private _AuthenticationService: AuthenticationService
  ) {}

  addProduct(productId: string) {
    clearInterval(this.holdService);
    this.holdService = setTimeout(() => {
      this._CartService.addProductToCart(productId).subscribe({
        next: (data) => {
          this.toastr.success(`${data.message}`, 'success');

          this._CartService.productCounts.next(data.numOfCartItems);
        },
        error: (data) => {
          if (data.error.message == 'Expired Token. please login again') {
            this.toastr.error(`${data.error.message}`, 'Error');
            this._AuthenticationService.logOut();
          } else if (
            data.error.message == 'Invalid Token. please login again'
          ) {
            this.toastr.error(`${data.error.message}`, 'Error');
            this._AuthenticationService.logOut();
          }
        },
      });
    }, 300);
  }
}
//
