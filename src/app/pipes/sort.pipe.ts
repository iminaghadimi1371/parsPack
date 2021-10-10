import {Pipe, PipeTransform} from '@angular/core';
import _ from 'lodash';
import {SortOrder} from '../models/sortorder.type';


@Pipe({
  name: 'sortPipe',
})
export class sortPipe implements PipeTransform {
  transform(rows: any[], order: { sortDirection: string, column: string }): any[] {
    if (!order || order.sortDirection === SortOrder.withoutSort) return rows;
    return _.orderBy(rows, [order.column], [order.sortDirection])
  }
}
