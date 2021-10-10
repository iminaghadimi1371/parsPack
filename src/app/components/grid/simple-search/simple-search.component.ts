import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {fromEvent, Subscription, timer} from 'rxjs';
import {debounce, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {Grid} from '../../../models/grid';
import {GridActionsNotifier} from '../../../services/grid-actions-notifier';

@Component({
  selector: 'app-simple-search',
  templateUrl: './simple-search.component.html',
})
export class SimpleSearchComponent implements OnInit, OnDestroy {
  @Input() grid: Grid;
  @Input() searchOfGrid: {
    placeHolder: string,
  }
  @ViewChild('simpleSearchInput', {static: true}) simpleSearchInput!: ElementRef;
  private querySubscription: Subscription = new Subscription();


  constructor(private gridActionsNotifier: GridActionsNotifier) {
  }

  ngOnInit(): void {
    this.getSearch();

  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }

  getSearch(): void {
    this.querySubscription.add(fromEvent(this.simpleSearchInput && this.simpleSearchInput.nativeElement, 'keyup').pipe(
      debounce((event: KeyboardEvent) => {
        if (event.key !== 'Enter') {
          return timer(1000);
        }
        return timer(0);
      }),
      // get value
      map((event: any) => {
        return event.target.value;
      })
      // if character length greater then 2
      , filter((res => res.length == 0 || res.length > 2))
      // If previous query is different from current
      , distinctUntilChanged()
      // subscription for response
      ).subscribe((text: string) => {
        // notify data change
        this.searchCompleteOnButtonPress(text);
      })
    );
  }

  searchCompleteOnButtonPress(data: string) {
    this.gridActionsNotifier.broadcast('simpleSearch', data);
  }


}
