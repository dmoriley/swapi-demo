import { DataSource } from '@angular/cdk/table';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {
  BehaviorSubject,
  catchError,
  finalize,
  map,
  Observable,
  of,
  Subject,
  takeUntil,
  tap,
  take,
} from 'rxjs';
import { SwapiService } from 'src/app/lib/services/swapi/swapi.service';
import { SwapiPeople } from 'src/app/lib/services/swapi/swapi.types';

@Component({
  selector: 'sw-people-page',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  host: {
    class: 'db pa2',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeoplePageComponent implements OnInit, AfterViewInit, OnDestroy {
  private _isDestroyed = new Subject<void>();

  dataSource: PeopleDataSource;
  displayedColumns = ['name', 'height', 'mass', 'hair_color', 'eye_color'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private swapi: SwapiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.dataSource = new PeopleDataSource(this.swapi);
    this.dataSource.loadPeople();
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        takeUntil(this._isDestroyed),
        tap(() => this.loadPeoplePage())
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this._isDestroyed.next();
    this._isDestroyed.complete();
  }

  loadPeoplePage() {
    this.dataSource.loadPeople(this.paginator.pageIndex + 1);
  }
}

class PeopleDataSource extends DataSource<SwapiPeople> {
  private _isDestroyed = new Subject<void>();
  private _source = new BehaviorSubject<SwapiPeople[]>([]);
  private _loading = new BehaviorSubject(false);

  totalItems: number;
  loading$ = this._loading.asObservable();

  constructor(private swapi: SwapiService) {
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

  loadPeople(page = 1) {
    this._loading.next(true);

    this.swapi
      .getAllPeople(page)
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
