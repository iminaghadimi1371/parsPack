import {NgModule} from '@angular/core';
import {ActionColumnComponent} from './columns-type/action-column/action-column.component';
import {TextColumnComponent} from './columns-type/text-column/text-column.component';
import {HeaderTableCellComponent} from './header-table-cell/header-table-cell.component';
import {GridComponent} from './grid.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NestedJsonPipe} from '../../pipes/nested-json.pipe';
import {PaginationPipe} from '../../pipes/pagination.pipe';
import {NgSelectModule} from '@ng-select/ng-select';
import { SimpleSearchComponent } from './simple-search/simple-search.component';
import {SimpleSearchPipe} from '../../pipes/simple-search.pipe';
import {sortPipe} from '../../pipes/sort.pipe';


@NgModule({
  declarations: [
    ActionColumnComponent,
    TextColumnComponent,
    GridComponent,
    HeaderTableCellComponent,
    NestedJsonPipe,
    PaginationPipe,
    SimpleSearchComponent,
    SimpleSearchPipe,
    sortPipe,
  ],
  exports: [
    GridComponent,
    SimpleSearchComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgSelectModule
  ],
  providers: [],
})
export class GridModule {
}
