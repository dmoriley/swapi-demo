import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from '../services';

/**
 * Interceptor to see loading state whenever an http request is made
 * @see https://medium.com/compendium/loading-status-in-angular-done-right-aeed09cfbea6
 */
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  // store pending requests
  private requests: Set<HttpRequest<unknown>> = new Set();

  constructor(private loadingService: LoadingService) {}
  removeRequest(req: HttpRequest<unknown>) {
    if (this.requests.has(req)) {
      this.requests.delete(req);
    }
    this.loadingService.loading = this.requests.size > 0;
  }
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.requests.add(req);
    this.loadingService.loading = true;
    // create a new observable which we return instead of the original
    return new Observable((observer) => {
      // subscribe to the original observable to ensure the HttpRequest is made
      const subscription = next.handle(req).subscribe({
        next: (event) => {
          if (event instanceof HttpResponse) {
            // this.removeRequest(req);
            observer.next(event);
          }
        },
        error: (err) => {
          // this.removeRequest(req);
          observer.error(err);
        },
        complete: () => {
          // this.removeRequest(req);
          observer.complete();
        },
      });
      // return teardown logic
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}
