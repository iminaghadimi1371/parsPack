import {Component, Input} from '@angular/core';

@Component({
  selector: 'action-column',
  templateUrl: './action-column.component.html',
})
export class ActionColumnComponent {
  @Input('row') row: any;
  @Input('column') column: any;
}
