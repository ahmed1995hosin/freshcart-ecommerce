import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  cartProduct: any[] = [];
  cartProductTemp: any[] = [];
  messageError: string = '';
  isLoading: boolean = false;
  totalCartPrice: number = 0;
  totalCartPriceTemp: number = 0;
  handleSetTime: any;
  cartId: string = '';
  constructor(
    private _CartService: CartService,
    private toastr: ToastrService,
    private _Router: Router
  ) {
    this.getProductsUserCart();
  }

  ngOnInit(): void {}
  getProductsUserCart(): void {
    this._CartService.getProductsInCart().subscribe({
      next: (data) => {
        this._CartService.productCounts.next(data.numOfCartItems);
        this.cartProduct = data.data.products;
        this.totalCartPrice = data.data.totalCartPrice;
        this.messageError = '';
        this.cartProductTemp = data.data.products;
        this.totalCartPriceTemp = data.data.totalCartPrice;
        this.cartId = data.data._id;
      },
      error: (error) => {
        this.isLoading = true;
        if (error.error.message.includes('No cart exist for this user:')) {
          this.messageError = error.error.message;
        }
      },
    });
  }

  // delete a product by its ID
  deleteProductFromCart(productId: string, index: number): void {
    this.cartProduct.splice(index, 1);
    this._CartService.deleteProductById(productId).subscribe({
      next: (data) => {
        this._CartService.productCounts.next(data.numOfCartItems);
        this.cartProduct = data.data.products;
        this.totalCartPrice = data.data.totalCartPrice;
        this.cartId = data.data._id;
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Error');
        this.temp();
      },
    });
  }
  // clear the cart of user
  clearCart(): void {
    this._CartService.productCounts.next(0);
    this.cartProduct = [];
    this.totalCartPrice = 0;

    this._CartService.clearUserCart().subscribe({
      next: (data) => {
        if (data.message === 'success') {
          this.isLoading = true;
          this._Router.navigate([]);
          this.cartProduct = [];
          this.totalCartPrice = 0;
          this.cartProductTemp = this.cartProduct;
          this.totalCartPriceTemp = this.totalCartPrice;
          // this.cartId = data.data._id;
          this._CartService.productCounts.next(data.numOfCartItems);
          this._Router.navigate(['/home']);
        }
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error');
        this.temp();
      },
    });
  }
  // updata the product in the cart
  updateProduct(
    productId: string,
    count: number,
    index: number,
    operator: string
  ): void {
    clearInterval(this.handleSetTime);
    if (count <= 0) {
      this.deleteProductFromCart(productId, 0);
    } else {
      this.cartProduct[index].count = count;
      if (operator == 'add') {
        this.totalCartPrice += this.cartProduct[index].price;
      } else if (operator == 'remove') {
        this.totalCartPrice -= this.cartProduct[index].price;
      }
      this.handleSetTime = setTimeout(() => {
        console.log('setTime');

        this._CartService.updataProductCount(productId, count).subscribe({
          next: (data) => {
            if (data.status == 'success') {
              this.cartProduct = data.data.products;
              this.totalCartPrice = data.data.totalCartPrice;
              this.cartProductTemp = data.data.products;
              this.totalCartPriceTemp = data.data.totalCartPrice;
              this.cartId = data.data._id;

              // console.log(data);
            }
          },
          error: (err) => {
            if (operator == 'add') {
              this.cartProduct[index].count = count - 1;
            } else if (operator == 'remove') {
              this.cartProduct[index].count = count + 1;
            }

            this.toastr.error('please login again', 'Error');
            this.temp();
          },
        });
      }, 500);
    }
  }
  temp(): void {
    this.cartProduct = this.cartProductTemp;
    this.totalCartPrice = this.totalCartPriceTemp;
  }
}
