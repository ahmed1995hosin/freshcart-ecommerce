import { SubcategoryComponent } from './../subcategory/subcategory.component';
import { CategoriesService } from 'src/app/services/categories.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesSlideComponent } from '../categories-slide/categories-slide.component';
import { SingleproductComponent } from '../singleproduct/singleproduct.component';
import { ProductsService } from 'src/app/services/products.service';
import { ProductDetalis } from 'src/app/interfaces/product-detalis';
import { WishService } from 'src/app/services/wish.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    CategoriesSlideComponent,
    SubcategoryComponent,
    SingleproductComponent,
    CarouselModule,
  ],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  constructor(
    private _CategoriesService: CategoriesService,
    private _ProductsService: ProductsService,
    private _WishService: WishService
  ) {}
  cargories: any[] = [];
  cargoryId: string = '';
  subcategory: any[] = [];
  products: any[] = [];
  categoryName: string = '';
  isloaded: boolean = false;
  noProductsIncategory: boolean = false;
  noProductsInSubcategory: boolean = false;
  wishListId: string[] = [];
  tempProducts: any[] = [];

  // slider settings
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 3,
      },
    },
    nav: false,
    autoplay: true,
    autoplayHoverPause: true,
    margin: 20,
  };
  // oninit
  ngOnInit(): void {
    this.isloaded = false;
    this.getAllCategories();
    // get wish list
    this._WishService.getWishlist().subscribe({
      next: (result) => {
        // console.log(result);
        const wish = result.data.map((pr: ProductDetalis) => {
          return pr._id;
        });
        this.wishListId = wish;
        this._WishService.wishList.next(this.wishListId);
      },
    });
  }

  // get subcategories
  getSubcategories(categoryid: string = '', categortNam: string = ''): void {
    this.isloaded = false;
    this._CategoriesService
      .getAllSubCategoriesOnCategory(categoryid)
      .subscribe({
        next: (sub) => {
          this.subcategory = sub.data;
          this.categoryName = categortNam;
          this.cargoryId = categoryid;
          this.isloaded = true;
          this.getProductByCategoryId(categoryid);
        },
      });
  }
  // get all categories
  getAllCategories(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next: (data) => {
        this.cargories = data.data;
        this.categoryName = data.data[9].name;
        // console.log(this.categoryName);
        this.cargoryId = data.data[9]._id;
        this.isloaded = true;
        this.getSubcategories(this.cargoryId);
        this.getProductByCategoryId(this.cargoryId);
      },
    });
  }

  fillterById(subcategoryId: string): void {
    // async () => {
    //   await this.getProductByCategoryId(this.cargoryId);
    // };
    this.products = this.tempProducts;
    this.noProductsInSubcategory = false;
    this.noProductsIncategory = false;
    // console.log(id);
    if (this.products.length > 0) {
      this.noProductsInSubcategory = false;
      this.noProductsIncategory = false;

      this.products = this.products.filter(
        (product) => product.subcategory[0]._id === subcategoryId
      );

      if (this.products.length === 0) {
        this.noProductsInSubcategory = true;
        this.noProductsIncategory = false;
      }
    } else {
      this.noProductsInSubcategory = true;
      this.noProductsIncategory = false;
    }
  }

  // get the product of category
  getProductByCategoryId(categoryIdd: string): void {
    this.noProductsIncategory = false;
    this.noProductsInSubcategory = false;
    this._ProductsService
      .getProducts(`?category[in]=${categoryIdd}`)
      .subscribe({
        next: (data) => {
          this.products = data.data;
          this.tempProducts = data.data;
          if (this.products.length === 0) {
            this.noProductsIncategory = true;
          }
        },
      });
  }
}
