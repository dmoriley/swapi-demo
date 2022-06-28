import { DataSource } from '@angular/cdk/table';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  finalize,
  map,
  Observable,
  of,
  Subject,
  takeUntil,
} from 'rxjs';
import { LoadingService } from 'src/app/lib';
import { SwapiService } from 'src/app/lib/services/swapi/swapi.service';
import { SwapiPeople } from 'src/app/lib/services/swapi/swapi.types';

@Component({
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  host: {
    class: 'db pa2',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeoplePageComponent implements OnInit {
  dataSource: PeopleDataSource;
  displayedColumns = ['name', 'height', 'mass', 'hair_color', 'eye_color'];

  constructor(private swapi: SwapiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const people$ = this.swapi
      .getAllPeople()
      .pipe(map((response) => response.results));
    this.dataSource = new PeopleDataSource(people$);
    this.dataSource.loadPeople();
  }
}

class PeopleDataSource extends DataSource<SwapiPeople> {
  private _isDestroyed = new Subject<void>();
  private _source = new BehaviorSubject<SwapiPeople[]>([]);
  private _loading = new BehaviorSubject(false);

  loading$ = this._loading.asObservable();

  constructor(private source$: Observable<SwapiPeople[]>) {
    super();
    this.loadPeople();
  }

  connect(): Observable<SwapiPeople[]> {
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

  loadPeople() {
    this._loading.next(true);

    this.source$
      .pipe(
        takeUntil(this._isDestroyed),
        catchError(() => of([])),
        finalize(() => this._loading.next(false))
      )
      .subscribe((people) => this._source.next(people));
  }
}
