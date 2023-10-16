import { AuthenticationService } from 'src/app/services/authentication-service.service';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  ViewChild,
  Renderer2,
} from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { WishService } from 'src/app/services/wish.service';
import { ProductDetalis } from 'src/app/interfaces/product-detalis';
import { ɵDomRendererFactory2 } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private _AuthenticationService: AuthenticationService,
    private _router: Router,
    private _CartService: CartService,
    private _WishService: WishService,
    private _renderer2: Renderer2
  ) {}

  @ViewChild('navElement') navElement1!: ElementRef;
  @HostListener('window:scroll')
  onScroll(): void {
    if (window.scrollY > this.navElement1.nativeElement.offsetHeight + 50) {
      this._renderer2.addClass(this.navElement1.nativeElement, 'py-3');
      this._renderer2.addClass(this.navElement1.nativeElement, 'fixed-top');
    } else {
      this._renderer2.removeClass(this.navElement1.nativeElement, 'py-3');
      this._renderer2.removeClass(this.navElement1.nativeElement, 'fixed-top');
    }
  }

  userName: string = '';
  userData: any = null;
  islogin: boolean = false;
  userToken: string | null = '';
  isOpen: boolean = false;
  isStricky: boolean = false;
  // navScroller: number | any = 0;
  countNotifications: number = 0;
  countWishList: number = 0;
  openToggle(): void {
    this.isOpen = !this.isOpen;
  }
  // get localization

  // oninit
  ngOnInit(): void {
    this._AuthenticationService.getLocal();
    this.getProductsUserCart();
    this.getWishList();
    // for count notifications wish list
    this._WishService.wishList.subscribe({
      next: (data: []) => {
        this.countWishList = data.length;
      },
    });
    // for count notifications
    this._CartService.productCounts.subscribe({
      next: (item: number) => {
        this.countNotifications = item;
      },
    });
    {
      // this.navScroller = document.getElementById('nav-scroller')?.offsetTop;
      // console.log(this.navScroller);
      // window.addEventListener('scroll', this.onScroll.bind(this));

      // to handel user tokens

      this._AuthenticationService.userToken.subscribe({
        next: (data) => {
          if (this._AuthenticationService.userToken.getValue() != null) {
            localStorage.setItem('token', data);
            this.userData = jwtDecode(data);

            this.islogin = true;
          } else {
            this._AuthenticationService.userinfo.next(null);
            localStorage.removeItem('token');
            this.islogin = false;
          }
        },
      });
      // handale user info

      this._AuthenticationService.userinfo.subscribe({
        next: (data) => {
          if (this._AuthenticationService.userinfo.getValue() != null) {
            this.userName = data.name;
            localStorage.setItem('userinfo', JSON.stringify(data));
            console.log(data.name);
          } else {
            localStorage.removeItem('userinfo');
            this._router.navigate(['/login']);
          }
        },
      });
    }
  }
  getProductsUserCart(): void {
    this._CartService.getProductsInCart().subscribe({
      next: (data) => {
        this._CartService.productCounts.next(data.numOfCartItems);
      },
      error: (error) => {},
    });
  }
  // get wish list
  getWishList(): void {
    this._WishService.getWishlist().subscribe({
      next: (result) => {
        // console.log(result);
        const wish = result.data.map((pr: ProductDetalis) => {
          return pr._id;
        });
        this._WishService.wishList.next(wish);
      },
    });
  }
  // onScroll(): void {
  //   if (window.scrollY > this.navScroller + 100) {
  //     this.isStricky = true;
  //   } else {
  //     this.isStricky = false;
  //   }
  // }
  // logout()
  logout(): void {
    this._AuthenticationService.logOut();
  }
}
