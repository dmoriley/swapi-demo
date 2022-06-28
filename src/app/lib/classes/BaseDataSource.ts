import { DataSource } from '@angular/cdk/table';
import {
  BehaviorSubject,
  catchError,
  finalize,
  map,
  Observable,
  of,
  Subject,
  take,
  tap,
} from 'rxjs';
import { SwapiResponse } from '../services/swapi/swapi.types';

export class BaseDataSource<T> extends DataSource<T> {
  private _isDestroyed = new Subject<void>();
  private _source = new BehaviorSubject<T[]>([]);
  private _loading = new BehaviorSubject(false);

  totalItems: number;
  loading$ = this._loading.asObservable();

  constructor(
    private apiMethod: (
      page: number,
      search?: string
    ) => Observable<SwapiResponse<T>>
  ) {
    super();
    this.loadItems();
  }

  connect(): Observable<T[]> {
    return this._source.asObservable();
  }

  disconnect() {
    // complete subscriptions
    this._loading.complete();
    this._source.complete();
    // mark as destroyed
    this._isDestroyed.next();
    this._isDestroyed.complete();
  }

  loadItems(page = 1, search?: string) {
    this._loading.next(true);

    this.apiMethod(page, search)
      .pipe(
        take(1),
        tap((response) => {
          this.totalItems = response.count;
        }),
        map((response) => response.results),
        catchError(() => of([])),
        finalize(() => this._loading.next(false))
      )
      .subscribe((people) => this._source.next(people));
  }
}
