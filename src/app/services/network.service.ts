import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ErrorModel } from '../models/error.model';
import { QueryModel } from '../models/query.model';
import { ApiEndpoints } from '../global/endpoints';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  constructor(private httpClient: HttpClient) {}

  getCurrentWeather(query: QueryModel): Observable<any> {
    const url =
      ApiEndpoints.currentWeatherApiEndpoint + '?' + query.getQueryUrl();
    return this.httpClient
      .get<any>(url)
      .pipe(catchError(this.handleError<ErrorModel>('Error occured')));
  }

  getForecast(query: QueryModel): Observable<any> {
    const url = ApiEndpoints.forecastApiEndpoint + '?' + query.getQueryUrl();
    return this.httpClient
      .get<any>(url)
      .pipe(catchError(this.handleError<ErrorModel>('Error occured')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
