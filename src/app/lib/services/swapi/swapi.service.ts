import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { SwapiPeople } from './swapi.types';

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
   * @param { boolean } jwt set to true for calls that need authorization
   * @param { boolean } plain set plain to true to prevent any customs headers from being added
   * @param { boolean } useOktaJWTToken set to true to use okta tokens instead of legacy
   * @return { Observable<T | ApiError> } if the request is successful, it would return observable
   * of type T. If not, it would throw observable of type ApiError.
   */
  private get(url: string, options): Observable<any> {
    return this.http.get(url, options).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => processErrorResponse(error));
      })
    );
  }

  getAllPeople() {
    return this.http.get<SwapiPeople[]>(this.baseApi + '/people').pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => processErrorResponse(error));
      })
    );
  }
}

function processErrorResponse(error: HttpErrorResponse): any {
  console.log('Error: ');
  console.log(JSON.stringify(error, null, 2));
}
