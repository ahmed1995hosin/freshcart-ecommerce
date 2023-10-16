import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ishalf',
  standalone: true,
})
export class IshalfPipe implements PipeTransform {
  transform(value: number): boolean {
    console.log(value);

    if (value % 1 >= 0.5) {
      return true;
    } else {
      return false;
    }
  }
}
