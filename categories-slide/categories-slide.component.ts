import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from 'src/app/services/categories.service';
@Component({
  selector: 'app-categories-slide',
  templateUrl: './categories-slide.component.html',
  styleUrls: ['./categories-slide.component.css'],
  standalone: true,
  imports: [CommonModule, CarouselModule],
})
export class CategoriesSlideComponent implements OnInit {
  categories: any[] = [];
  constructor(private _CategoriesService: CategoriesService) {}
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
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: false,
    autoplay: true,
    autoplayHoverPause: true,
    margin: 20,
  };
  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next: (Category) => {
        this.categories = Category.data;
      },
    });
  }
  category(id: string): void {
    this._CategoriesService.categoryId.next(`?category[in]=${id}`);
  }
}
