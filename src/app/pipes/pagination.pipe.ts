import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'pagination',
})
export class PaginationPipe implements PipeTransform {

  transform(rows: any[], currentPage: number, pageSize: number): any[] {
    const takeItem = (currentPage - 1) * pageSize;
    return _(rows).slice(takeItem).take(pageSize).value();
  }

}
