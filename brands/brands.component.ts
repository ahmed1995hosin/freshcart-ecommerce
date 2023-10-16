import { ProductDetalis } from './../../interfaces/product-detalis';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SingleproductComponent } from '../singleproduct/singleproduct.component';
import { WishService } from 'src/app/services/wish.service';
import { ProductsService } from 'src/app/services/products.service';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
  standalone: true,
  imports: [CommonModule, SingleproductComponent],
})
export class BrandsComponent implements OnInit {
  products: ProductDetalis[] = [];
  wishListId: string[] = [];
  brands: any[] = [];
  isLoading: boolean = false;
  isLoadingPr: boolean = false;

  brandInfo: any;
  constructor(
    private _WishService: WishService,
    private _ProductsService: ProductsService,
    private _BrandService: BrandService
  ) {}
  ngOnInit(): void {
    this.getBrands();
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
  getBrands(): void {
    this._BrandService.getAllBrand().subscribe({
      next: (result) => {
        this.brands = result.data;
        this.getProductByBrand(result.data[0]._id);
      },
    });
  }

  // get product of that brand
  getProductByBrand(brandid: string): void {
    this.isLoadingPr = true;
    this._ProductsService.getProducts(`?brand=${brandid}`).subscribe({
      next: (data) => {
        this.products = data.data;
        this.isLoadingPr = true;
        if (data.data.length == 0) {
          this.isLoadingPr = false;
        }
      },
    });
    this.getBrand(brandid);
    // console.log(brandid);
  }

  getBrand(brandId: string = ''): void {
    this._BrandService.getBrandById(brandId).subscribe({
      next: (data) => {
        this.brandInfo = data.data;
        this.isLoading = true;
        if (data.data == 0) {
          this.isLoading = false;
        }
      },
    });
  }
}
