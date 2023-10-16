import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cuttitle',
  standalone: true,
})
export class CuttitlePipe implements PipeTransform {
  transform(value: string, count: number): string {
    return value.split(' ').slice(0, 2).join(' ');
  }
}
