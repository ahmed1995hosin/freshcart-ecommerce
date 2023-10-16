import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ProductDetalis } from 'src/app/interfaces/product-detalis';
import { AuthenticationService } from 'src/app/services/authentication-service.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { WishService } from 'src/app/services/wish.service';

@Component({
  selector: 'app-product-detalis',
  templateUrl: './product-detalis.component.html',
  styleUrls: ['./product-detalis.component.css'],
})
export class ProductDetalisComponent implements OnInit {
  productIdwish: string = '';
  unsubscribe!: Subscription;
  productDetalis!: ProductDetalis;
  wishListId: string[] = [];
  sendData: boolean = false;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _AuthenticationService: AuthenticationService,
    private _WishService: WishService
  ) {}
  ngOnInit(): void {
    this.getProductId();
    this.getwishlist();
    this.getProductDetalis();
  }
  getwishlist(): void {
    this._WishService.getWishlist().subscribe({
      next: (result) => {
        const wish = result.data.map((pr: any) => {
          return pr._id;
        });
        this.wishListId = wish;
        this.sendData = true;
      },
    });
  }

  getProductId(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (para) => {
        if (para.get('id')) {
          this.productIdwish = para.get('id') || '';
        }
      },
    });
  }
  getProductDetalis(): void {
    this._ProductsService.getProductDetails(this.productIdwish).subscribe({
      next: (data) => {
        this.productDetalis = data.data;
      },
    });
  }

  // carousel methods

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: false,
  };
  // addProduct
  addProduct(productId: string): void {
    // console.log(productId);
    this._CartService.addProductToCart(productId).subscribe({
      next: (data) => {
        this._ToastrService.success(`${data.message}`, 'success');
        this._CartService.productCounts.next(data.numOfCartItems);
      },
      error: (error) => {
        if (error.error.message === 'Expired Token. please login again') {
          this._ToastrService.error(`${error.error.message}`, 'error');
          this._AuthenticationService.logOut();
        } else if (
          error.error.message === 'Invalid Token. please login again'
        ) {
          this._ToastrService.error(`please login`, 'error');
          this._AuthenticationService.logOut();
        }
      },
    });
  }
}
