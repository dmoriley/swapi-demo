import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { WindowResizeEvent, WindowService } from '../window/window.service';

/** Service that contains information about the document */
@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  /** Document HTML element */
  documentEl: HTMLElement;
  /** Width of the useable document */
  width = 0;
  /** Height of the useable document */
  height = 0;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private windowService: WindowService
  ) {
    this.documentEl = this.document.documentElement;

    this.windowService.windowResize$.subscribe((event: WindowResizeEvent) => {
      this.setDocWidthHeight(
        event.currentTarget.innerWidth,
        event.currentTarget.innerHeight
      );
    });
  }

  private setDocWidthHeight(width, height) {
    // set css properties on document so height and width are easily
    // accessible from scss/css files if required. More reliable than
    // using vw and vh in some scenarios, especially 100vh/vw
    this.documentEl.style.setProperty(
      '--viewportWidthOnDocument',
      `${width}px`
    );
    this.documentEl.style.setProperty(
      '--viewportHeightOnDocument',
      `${height}px`
    );

    // set height and width of document so its easily accessible from ts files
    this.width = width;
    this.height = height;
  }
}
