import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'nestedJson',
})
export class NestedJsonPipe implements PipeTransform {

  transform(data: any, value: any): any {
    return _.get(data, value);
  }

}
