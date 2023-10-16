import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'createarray',
  standalone: true,
})
export class CreatearrayPipe implements PipeTransform {
  transform(value: number): number[] {
    // console.log(value);
    return new Array(value);
  }
}
