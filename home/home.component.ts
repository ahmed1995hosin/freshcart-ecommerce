import { Component, OnInit } from '@angular/core';
import { ProductDetalis } from 'src/app/interfaces/product-detalis';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { WishService } from 'src/app/services/wish.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isLoading: boolean = false;
  searchName: string = '';
  products: ProductDetalis[] = [];
  idCategory: string = '';
  wishListId: string[] = [];

  constructor(
    private _ProductsService: ProductsService,
    private _CategoriesService: CategoriesService,
    private _WishService: WishService
  ) {
    this._CategoriesService.categoryId.subscribe({
      next: (id) => {
        this.idCategory = id;

        this.getProducts(this.idCategory);
      },
    });
  }
  ngOnInit(): void {
    this.getProducts(this.idCategory);
    //
    this._WishService.getWishlist().subscribe({
      next: (result) => {
        // console.log(result);
        const wish = result.data.map((pr: ProductDetalis) => {
          return pr._id;
        });
        this.wishListId = wish;
        this._WishService.wishList.next(wish);
      },
    });
  }
  getProducts(id: string): void {
    this.isLoading = false;
    this._ProductsService.getProducts(this.idCategory).subscribe({
      next: (response) => {
        this.products = response.data;
        if (response.data.length == 0) {
          this.isLoading = true;
        }
      },
    });
  }
}
