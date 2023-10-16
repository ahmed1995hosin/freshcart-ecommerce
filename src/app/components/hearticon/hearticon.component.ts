import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { WishService } from 'src/app/services/wish.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hearticon',
  templateUrl: './hearticon.component.html',
  styleUrls: ['./hearticon.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class HearticonComponent implements OnInit {
  constructor(
    private _WishService: WishService,
    private toastr: ToastrService
  ) {
    // this.isWishlist = false;
  }
  isWishlist: boolean = false;

  @Input() productId!: string;
  // wishListId: string[] = [];
  @Input('wishListId') wishList!: string[];

  //
  ngOnInit(): void {
    if (this.wishList.includes(this.productId)) {
      this.isWishlist = true;
    }
  }

  // wishList: string[] = [];

  // add product to wishlist
  addWishlist(productID: string): void {
    this.isWishlist = true;
    this._WishService.addProductWishList(productID).subscribe({
      next: (data) => {
        this.toastr.success(data.message, data.status);
        this._WishService.wishList.next(data.data);
        this.isWishlist = true;
        // console.log(data.data);
      },
      error: (err) => {
        this.toastr.error(err.message, err.status);
        // console.log(err);
        this.isWishlist = false;
      },
    });
  }
  removeWishlist(productID: string): void {
    this.isWishlist = false;
    this._WishService.removeProductWishList(productID).subscribe({
      next: (data) => {
        this.toastr.success(data.message, data.status);
        this._WishService.wishList.next(data.data);
        this.isWishlist = false;
        // console.log(data.data);
      },
      error: (err) => {
        this.toastr.error(err.message, err.status);
        this.isWishlist = true;
      },
    });
  }
}
//
