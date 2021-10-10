import {Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {SortOrder} from '../../../models/sortorder.type';

@Component({
  selector: 'header-table-cell',
  templateUrl: './header-table-cell.component.html',
})
export class HeaderTableCellComponent implements OnInit {
  @ViewChildren('sortingList') sortingList!: QueryList<any>;
  @Input() theadLabel: Array<string> = [];
  @Input() tHeadCustomWith: Array<any> = [];
  @Input() theadSortConfig: Array<any> = [];
  @Output() sort: EventEmitter<{ sortDirection: string, column: string }> = new EventEmitter<{ sortDirection: string, column: string }>();
  public sortDir = SortOrder.DESC;


  ngOnInit(): void {
  }

  onSortClick(index: number): void {
    if (!this.theadSortConfig[index].sortable) return;
    const sortingList = this.sortingList.toArray();
    const filterIcon = sortingList[index].nativeElement.querySelector('.filter-icon');
    if (!filterIcon) return;
    const filterIconClassList = filterIcon.classList;
    if (filterIconClassList.contains('fa-sort-alt')) {
      this.sortDir = SortOrder.DESC;
      filterIconClassList.remove('fa-sort-alt');
      filterIconClassList.add('fa-long-arrow-down');
    } else if (filterIconClassList.contains('fa-long-arrow-down')) {
      this.sortDir = SortOrder.ASC;
      filterIconClassList.remove('fa-long-arrow-down');
      filterIconClassList.add('fa-long-arrow-up');
    } else {
      this.sortDir = SortOrder.withoutSort;
      filterIconClassList.remove('fa-long-arrow-up');
      filterIconClassList.add('fa-sort-alt');
    }
    // we send req with sort eventEmitter
    this.clearSortingOtherColumns(index);
    this.sort.emit({sortDirection: this.sortDir, column: this.theadSortConfig[index].value});
  }

  clearSortingOtherColumns(index: number): void {
    this.theadSortConfig.forEach((item, i) => {
      if (item.sortable && i !== index) {
        const sortingList = this.sortingList.toArray();
        const filterIconClassList = sortingList[i].nativeElement.querySelector('.filter-icon')?.classList;
        if (filterIconClassList?.contains('fa-long-arrow-up')) {
          filterIconClassList.remove('fa-long-arrow-up');
        } else if (filterIconClassList?.contains('fa-long-arrow-down')) {
          filterIconClassList.remove('fa-long-arrow-down');
        }
        filterIconClassList?.add('fa-sort-alt');
      }
    });
  }

}
