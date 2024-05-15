import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocumentService } from './lib';
import { BreakpointService } from './lib/services/breakpoint/breakpoint.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  isMobile$: Observable<boolean>;

  constructor(
    private breakpointService: BreakpointService,
    private documentService: DocumentService, // included here so document service initializes
  ) {
    this.isMobile$ = this.breakpointService.isMobile$;
  }
}
