import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _loading = new BehaviorSubject(false);
  get loading() {
    return this._loading.value;
  }
  set loading(value: boolean) {
    this._loading.next(value);
  }
  loading$ = this._loading.asObservable();
  constructor() {}
}
