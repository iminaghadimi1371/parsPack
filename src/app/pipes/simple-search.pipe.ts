import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'simpleSearch',
})
export class SimpleSearchPipe implements PipeTransform {

  transform(rows: any[], searchBy: string, searchText: string): any[] {
    if(!searchBy) return rows;
    return rows.filter(row => row[searchBy].toLowerCase().startsWith(searchText.toLowerCase()));
  }

}
