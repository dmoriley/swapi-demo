import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { debounceTime, distinctUntilChanged, fromEvent, tap } from 'rxjs';
import { BaseDataSource } from '../../classes';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    MatTableModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
    CommonModule,
  ],
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent implements OnInit, AfterViewInit {
  @Input() dataSource: BaseDataSource<any>;
  @Input() displayedColumns: string[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filterInput') filterInput: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.dataSource.loadItems();
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        takeUntilDestroyed(),
        tap(() => this.loadPage()),
      )
      .subscribe();

    fromEvent(this.filterInput.nativeElement, 'keyup')
      .pipe(
        takeUntilDestroyed(),
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadPage();
        }),
      )
      .subscribe();
  }

  loadPage() {
    this.dataSource.loadItems(
      this.paginator.pageIndex + 1,
      this.filterInput.nativeElement.value,
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
      { state: { url: row.url, name: row.name || row.title } },
    );
  }
}
