import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { EventEmitter } from 'events';

@Component({
  selector: 'app-subcategory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css'],
})
export class SubcategoryComponent {
  @Input() category: any[] = [];
  @Input() categoryId: string = '';
  @Input() categoryName: string = '';
  @Output('subcategoryId') subcategoryId: EventEmitter<any> =
    new EventEmitter();

  fillterById(subid: string): void {
    this.subcategoryId.emit(subid);
  }
}
