import { Pipe, PipeTransform } from '@angular/core';
import { ProductDetalis } from '../interfaces/product-detalis';

@Pipe({
  name: 'maxlength',
})
export class MaxlengthPipe implements PipeTransform {
  transform(value: ProductDetalis[], length: number): ProductDetalis[] {
    return value.splice(0, length);
  }
}
