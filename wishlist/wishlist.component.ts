import { Component, OnInit, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishService } from 'src/app/services/wish.service';
import { CuttitlePipe } from 'src/app/pipes/cuttitle.pipe';
import { RoundPipe } from 'src/app/pipes/round.pipe';
import { CreatearrayPipe } from 'src/app/pipes/createarray.pipe';
import { IshalfPipe } from 'src/app/pipes/ishalf.pipe';
import { RatingComponent } from '../rating/rating.component';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication-service.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [
    CommonModule,
    CuttitlePipe,
    RoundPipe,
    CreatearrayPipe,
    IshalfPipe,
    RatingComponent,
  ],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  wishProduct: any[] = [];
  isloaded: boolean = false;
  constructor(
    private _WishService: WishService,
    private _CartService: CartService,
    private toastr: ToastrService,
    private _ProductsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.getWishProduct();
  }
  getWishProduct(): void {
    this._WishService.getWishlist().subscribe({
      next: (data) => {
        this.wishProduct = data.data;
        console.log(this.wishProduct);
        this._WishService.wishList.next(data.data);
        this.isloaded = false;
        // console.log(this.wishProduct.length);
        if (this.wishProduct.length === 0) {
          this.isloaded = true;
        }
      },
      error: (err) => {
        // console.log(err);
        // this.isloaded = true;
      },
    });
  }
  //
  deleteProductFromwishList(product: any): void {
    this.wishProduct.splice(this.wishProduct.indexOf(product), 1);
    this._WishService.removeProductWishList(product?._id).subscribe({
      next: (data) => {
        // console.log(data);
        if (data.data.length == 0) {
          this.isloaded = true;
        }
        // this.toastr.success(data.message, data.status);
        this._WishService.wishList.next(data.data);
      },
      error: (err) => {
        this.toastr.error(err.message, err.status);
        this.getWishProduct();
      },
    });
  }
  addProductToCart(productt: any): void {
    console.log(productt._id);
    // this.wishProduct.splice(this.wishProduct.indexOf(productt), 1);
    this._CartService.addProductToCart(productt._id).subscribe({
      next: (data) => {
        console.log(data);
        // if (data.data.length == 0) {
        //   this.isloaded = true;
        // }
        if (data.status == 'success') {
          this.toastr.success(data.message, data.status);
          this._CartService.productCounts.next(data.numOfCartItems);
          this.deleteProductFromwishList(productt);
        }
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(err.message, err.status);
        this.getWishProduct();
      },
    });
  }
}
