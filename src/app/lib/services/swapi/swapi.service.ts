import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { SwapiResponse } from './swapi.types';

@Injectable({
  providedIn: 'root',
})
export class SwapiService {
  constructor(private http: HttpClient) {}

  private readonly baseApi = 'https://swapi.dev/api/';

  /**
   * Function to call http get
   * @param { string } url url to call http get
   * @param { OptionsArgs } options request option
   * @return { Observable<T | ApiError> } if the request is successful, it would return observable
   * of type T. If not, it would throw observable of type ApiError.
   */
  getResource<T>(url: string, options: any = {}) {
    return this.http
      .get<T>(url, { ...options, observe: 'body', responseType: 'json' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => processErrorResponse(error));
        })
      ) as unknown as Observable<T>; // TS thinks the type of Observable<HttpEvent<T>>, need to cast
  }

  getPageResource<T>(resourceName: string, page = 1, search?: string) {
    const paramObj: { page: number; search?: string } = { page };
    if (search && search.length > 0) {
      paramObj.search = search;
    }
    const params = new HttpParams({
      fromObject: paramObj,
    });
    return this.getResource<SwapiResponse<T>>(this.baseApi + resourceName, {
      params,
    });
  }
}

function processErrorResponse(error: HttpErrorResponse): any {
  console.log('Error: ');
  console.log(JSON.stringify(error, null, 2));
}
