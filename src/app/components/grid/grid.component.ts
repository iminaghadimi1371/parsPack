import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Grid} from '../../models/grid';
import _ from 'lodash'
import {GridActionsNotifier} from '../../services/grid-actions-notifier';
import {SimpleSearchPipe} from '../../pipes/simple-search.pipe';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
})
export class GridComponent implements OnInit, OnDestroy {
  @Input() grid: Grid = new Grid();
  // general
  public tHeadLabels: Array<string> = [];
  public tHeadCustomWith: Array<any> = [];
  public columnData: any[] = [];
  public rows: any[] = [];
  public tHeadSortConfig: Array<{}> = [];
  public sortDirection: { sortDirection: string, column: string };

  // loading
  public isLoading: boolean = true;
  // pagination
  public pageSize = 3;
  public pageSizes = [3, 6, 9];
  public currentPage = 1;
  public pageCount: number[] = [];

  public searchText: string = '';
  private simpleSearchPipe: SimpleSearchPipe;


  private querySubscription: Subscription = new Subscription();


  constructor(private cdRef: ChangeDetectorRef,
              private gridActionsNotifier: GridActionsNotifier) {
  }

  ngOnInit(): void {
    this.setColumns();
    this.simpleSearchPipe = new SimpleSearchPipe();
    this.getData();
    this.querySubscription.add(this.gridActionsNotifier.ListenOn('simpleSearch').subscribe(res => {
        this.searchText = res.toString();
        this.calcPageCount();
      }
    ));
  }


  getData(): void {
    this.isLoading = true;
    this.grid.service[this.grid.method]().subscribe(
      res => {
        this.rows = res;
        this.calcPageCount();
        this.isLoading = false;
      }
    )
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }

  private setColumns(): void {
    this.tHeadLabels = [];
    this.columnData = [];
    for (let i = 0; i < this.grid.columns.length; i++) {
      this.columnData.push(Object.assign({}, this.grid.columns[i]));
      // @ts-ignore
      this.tHeadLabels.push(this.grid.columns[i].headerTableCell);
      this.tHeadCustomWith.push({
        customWidth: this.grid.columns[i].customWidth,
      });
      this.tHeadSortConfig.push({
        value: this.grid.columns[i].sortableName ? this.grid.columns[i].sortableName : this.grid.columns[i].value,
        sortable: this.grid.columns[i].sortAble
      });
    }

  }

  public calcPageCount(): void {
    this.currentPage = 1;
    let rowLength = this.rows.length;
    if (this.grid.searchBy && this.searchText) rowLength = this.simpleSearchPipe.transform(this.rows, this.grid.searchBy, this.searchText).length
    const numbers = Math.ceil(rowLength / this.pageSize);
    this.pageCount = _.range(1, numbers + 1);
  }

  public onPageChange(currentPage) {
    if (currentPage > this.pageCount.length || currentPage < 1) return;
    this.currentPage = currentPage;
  }

  sortRow($event) {
    this.sortDirection = $event;
  }


}
