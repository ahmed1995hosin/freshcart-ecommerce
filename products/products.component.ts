import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductDetalis } from 'src/app/interfaces/product-detalis';
import { ProductsService } from 'src/app/services/products.service';
import { WishService } from 'src/app/services/wish.service';
import { MainsliderComponent } from '../mainslider/mainslider.component';
import { FormsModule } from '@angular/forms';
import { SearchNamePipe } from 'src/app/pipes/search-name.pipe';
import { SingleproductComponent } from '../singleproduct/singleproduct.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MainsliderComponent,
    FormsModule,
    NgxPaginationModule,
    SearchNamePipe,
    SingleproductComponent,
  ],
})
export class ProductsComponent implements OnInit {
  isLoading: boolean = false;
  searchName: string = '';

  products: ProductDetalis[] = [];
  idCategory: string = '';
  wishListId: string[] = [];
  isload: boolean = false;

  // pagenation parameters
  pageSize: number = 15;
  curPage: number = 1;
  total!: number;
  constructor(
    private _ProductsService: ProductsService,
    private _WishService: WishService
  ) {
    this.getProducts();
  }
  ngOnInit(): void {
    this._WishService.getWishlist().subscribe({
      next: (result) => {
        // console.log(result);
        const wish = result.data.map((pr: ProductDetalis) => {
          return pr._id;
        });
        this.wishListId = wish;
        this._WishService.wishList.next(this.wishListId);
        this.isload = true;
      },
    });
  }
  getProducts(page: string = '?page=2', limit: string = '&limit=20'): void {
    this.isLoading = false;
    this._ProductsService.getProducts(page + limit).subscribe({
      next: (response) => {
        this.products = response.data;
        this.pageSize = response.metadata.limit;
        this.curPage = response.metadata.currentPage;
        this.total = response.results;
        if (response.data.length == 0) {
          this.isLoading = true;
        }
      },
    });
  }

  // pageChanged
  pageChanged(event: any): void {
    this.getProducts('?page=' + event);
  }
}
