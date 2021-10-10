import {Component, Input} from '@angular/core';

@Component({
  selector: 'text-column',
  templateUrl: './text-column.component.html',
})
export class TextColumnComponent {
  @Input('value') value: any;
}
