import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { finalize, first, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { SwapiService } from '../../services';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  standalone: true,
  imports: [MatExpansionModule, MatProgressBarModule],
  selector: 'app-lazy-load-dropdown',
  templateUrl: './lazy-load-dropdown.component.html',
  styleUrls: ['./lazy-load-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LazyLoadDropdownComponent implements OnInit {
  isLoading = false;
  data: any;

  @Input() title: string;
  @Input() urls: string[];

  constructor(
    private swapiService: SwapiService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {}

  loadRowData() {
    if (this.data) {
      // dont need to call again if we have data
      return;
    }

    // else make call to get data
    of(true)
      .pipe(
        // first set loading to true
        // get do this outside of observable chain, just wanted to try
        tap(() => (this.isLoading = true)),
        switchMap(() =>
          // forkJoin to wait for everything to finsh
          forkJoin(
            this.urls.map((url) => {
              // generate observables to call
              return this.swapiService.getResource(url).pipe(first());
            }),
          ).pipe(
            // extract names
            map((result) => {
              return (result as Array<any>).reduce((prev, current) => {
                prev.push(current.name || current.title);
                return prev;
              }, []);
            }),
            first(),
            tap((result) => console.log(JSON.stringify(result, null, 2))),
            finalize(() => (this.isLoading = false)),
          ),
        ),
        first(),
        tap((data) => {
          this.data = data;
          this.cdr.markForCheck();
        }),
      )
      .subscribe();
  }
}
