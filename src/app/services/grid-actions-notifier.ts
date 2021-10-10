import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {filter, map} from "rxjs/operators";

interface BroadcastEvent {
  key: any;
  data?: any;
}

@Injectable({providedIn: 'root'})

export class GridActionsNotifier {
  private broadcastEvent = new Subject<BroadcastEvent>();

  broadcast(key: any, data?: any) {
    this.broadcastEvent.next({key, data});
  }

  ListenOn<T>(key: any): Observable<T> {
    return this.broadcastEvent.asObservable()
      .pipe(
        filter(event => event.key === key),
        map(event => <T>event.data)
      );
  }
}
