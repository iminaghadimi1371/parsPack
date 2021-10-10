import {Component, Input} from '@angular/core';

@Component({
  selector: 'text-column',
  templateUrl: './text-column.component.html',
  styleUrls: ['./text-column.component.css']
})
export class TextColumnComponent {
  @Input('value') value: any;
}
