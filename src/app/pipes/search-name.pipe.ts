import { Pipe, PipeTransform } from '@angular/core';
import { ProductDetalis } from '../interfaces/product-detalis';

@Pipe({
  name: 'searchName',
  standalone: true,
})
export class SearchNamePipe implements PipeTransform {
  transform(value: ProductDetalis[], searchItem: string): ProductDetalis[] {
    return value.filter((product: ProductDetalis) =>
      product.title?.toLowerCase().includes(searchItem.toLowerCase())
    );
  }
}
