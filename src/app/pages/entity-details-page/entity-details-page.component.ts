import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { BehaviorSubject, finalize, first, map, Observable } from 'rxjs';
import { SwapiBase, SwapiService } from 'src/app/lib/services';
import { LazyLoadDropdownComponent } from 'src/app/lib/components/lazy-load-dropdown/lazy-load-dropdown.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatProgressBarModule,
    LazyLoadDropdownComponent,
    CommonModule,
  ],
  selector: 'app-entity-details-page',
  templateUrl: './entity-details-page.component.html',
  styleUrls: ['./entity-details-page.component.scss'],
})
export class EntityDetailsPageComponent implements OnInit {
  private _isLoading = new BehaviorSubject(false);

  isLoading$ = this._isLoading.asObservable();
  extras: NavigationExtras;
  data$: Observable<any>;

  constructor(
    private router: Router,
    private swapiService: SwapiService,
  ) {
    const { extras } = this.router.getCurrentNavigation() ?? {};
    // get the navigation extras in constructor while router is still resolving
    this.extras = extras;
  }

  isArray = Array.isArray;

  ngOnInit(): void {
    this._isLoading.next(true);

    this.data$ = this.swapiService
      .getResource<Record<string, any>>(this.extras.state['url'])
      .pipe(
        first(),
        map((data) => {
          for (let key of Object.keys(data)) {
            if (key in baseObject) {
              delete data[key]; // get rid of base metadata
            }

            if (this.isArray(data[key]) && data[key].length === 0) {
              // change empty arry to none text
              data[key] = 'None';
            } else if (
              typeof data[key] === 'string' &&
              (data[key] as string).startsWith('https://swapi.dev') // check if string url
            ) {
              data[key] = [data[key]]; // change to array
            }
          }
          return data;
        }),
        finalize(() => this._isLoading.next(false)),
      );
  }
}

// conforms to shape of base to make sure all keys are checked
const baseObject: SwapiBase = {
  created: '',
  edited: '',
  url: '',
};
