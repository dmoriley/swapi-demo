import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';

import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { BaseDataSource } from '../../classes';
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent implements OnInit, AfterViewInit, OnDestroy {
  private _isDestroyed = new Subject<void>();

  @Input() dataSource: BaseDataSource<any>;
  @Input() displayedColumns: string[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filterInput') filterInput: ElementRef;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.dataSource.loadItems();
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        takeUntil(this._isDestroyed),
        tap(() => this.loadPage())
      )
      .subscribe();

    fromEvent(this.filterInput.nativeElement, 'keyup')
      .pipe(
        takeUntil(this._isDestroyed),
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadPage();
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this._isDestroyed.next();
    this._isDestroyed.complete();
  }

  loadPage() {
    this.dataSource.loadItems(
      this.paginator.pageIndex + 1,
      this.filterInput.nativeElement.value
    );
  }

  clearFilterInput() {
    this.filterInput.nativeElement.value = '';
    this.paginator.pageIndex = 0;
    this.loadPage();
  }

  navigateToDetailsPage(row: any) {
    this.router.navigate(
      [`/${this.route.snapshot.url[0].path}/details`, row.name || row.title],
      { state: { url: row.url, name: row.name || row.title } }
    );
  }
}
