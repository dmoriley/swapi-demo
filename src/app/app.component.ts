import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocumentService } from './lib';
import { BreakpointService } from './lib/services/breakpoint/breakpoint.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  isMobile$ = this.breakpointService.isMobile$;

  constructor(
    private breakpointService: BreakpointService,
    private documentService: DocumentService // included here so document service initializes
  ) {}
}
