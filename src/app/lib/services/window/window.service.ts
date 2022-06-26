import { Inject, Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { WINDOW } from '../../injection';

@Injectable({
  providedIn: 'root',
})
export class WindowService {
  /** observable of the resize event of the window */
  windowResize$;

  constructor(@Inject(WINDOW) private window) {
    this.windowResize$ = fromEvent(this.window, 'resize').pipe(
      startWith({
        // start with the window innerHeight and width
        // interface same as result from event
        currentTarget: {
          innerWidth: this.window.innerWidth,
          innerHeight: this.window.innerHeight,
        },
      })
    );
  }
}

export interface WindowResizeEvent {
  currentTarget: {
    innerWidth: number;
    innerHeight: number;
  };
}
