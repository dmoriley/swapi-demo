import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { OnDestroy } from '@angular/core';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

export enum ViewportSize {
  Unknown = 1,
  XSmall,
  Small,
  Medium,
  Large,
  XLarge,
}

/** Service that helps you determine the current viewport size */
@Injectable({
  providedIn: 'root',
})
export class BreakpointService implements OnDestroy {
  private isDestroyed$ = new Subject<void>();
  private displayNameMap = new Map([
    [Breakpoints.XSmall, ViewportSize.XSmall],
    [Breakpoints.Small, ViewportSize.Small],
    [Breakpoints.Medium, ViewportSize.Medium],
    [Breakpoints.Large, ViewportSize.Large],
    [Breakpoints.XLarge, ViewportSize.XLarge],
  ]);
  private _viewportSize = new BehaviorSubject<ViewportSize>(
    ViewportSize.Unknown
  );

  /** Snapshot of the viewport size right now */
  viewportSize = this._viewportSize.value;
  /** Observable of the current viewport size */
  viewportSize$ = this._viewportSize.asObservable();

  /** Observable if the viewport is mobile size (<= 599.98px) */
  isMobile$ = this.viewportSize$.pipe(
    switchMap((size) => of(size === ViewportSize.XSmall))
  );
  /** Snapshot if currently the viewport is mobile size (<= 599.98px) */
  get isMobile() {
    return this.viewportSize === ViewportSize.XSmall;
  }

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe((result) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this._viewportSize.next(
              this.displayNameMap.get(query) as ViewportSize
            );
            return;
          }
        }
        this._viewportSize.next(ViewportSize.Unknown);
      });
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next();
    this.isDestroyed$.complete();
  }
}
