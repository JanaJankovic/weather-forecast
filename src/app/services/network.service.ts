import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ErrorModel } from '../models/error.model';
import { QueryModel } from '../models/query.model';
import { ApiEndpoints } from '../global/endpoints';
import { TempEnv } from 'temp.env';
import { WeatherModel } from '../models/weather.model';
import { ForecastModel } from '../models/forecast.model';

@Injectable({
  providedIn: 'root',
})

/**
 * Service for network communication - API requests
 */
export class NetworkService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Method makes API request for current weather
   * @param query parameters required by API
   * @returns Observable<WeatherModel>
   */
  getCurrentWeather(query: QueryModel): Observable<WeatherModel> {
    const url =
      ApiEndpoints.currentWeatherApiEndpoint + '?' + query.getQueryUrl();
    return this.httpClient
      .get<any>(url)
      .pipe(catchError(this.handleError<ErrorModel>('Error occured')));
  }

  /**
   * Method makes API request for 5 day forecast
   * @param query parameters required by API
   * @returns Observable<ForecastModel>
   */
  getForecast(query: QueryModel): Observable<ForecastModel> {
    const url = ApiEndpoints.forecastApiEndpoint + '?' + query.getQueryUrl();
    return this.httpClient
      .get<any>(url)
      .pipe(catchError(this.handleError<ErrorModel>('Error occured')));
  }

  /**
   * Method returns list of cities that match input search parameter
   * @param input city name
   * @returns list of cities
   */
  getGeoCities(input: string): Observable<any> {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('name', input);
    urlSearchParams.append('limit', '100');

    const url = ApiEndpoints.geoApiEndpoint + '?' + urlSearchParams;

    return (
      this.httpClient
        // eslint-disable-next-line @typescript-eslint/naming-convention
        .get<any>(url, { headers: { 'X-Api-Key': TempEnv.geoApiKey } })
        .pipe(catchError(this.handleError<ErrorModel>('Error occured')))
    );
  }

  /**
   * Method receives geo coordinates and returns city name and country
   * @param query parameters required by API
   * @returns information of city
   */
  getReverseGeoCity(query: QueryModel): Observable<any> {
    const url = ApiEndpoints.reverseGeoApiEndoipint + '?' + query.getQueryUrl();
    return this.httpClient
      // eslint-disable-next-line @typescript-eslint/naming-convention
      .get<any>(url, { headers: { 'X-Api-Key': TempEnv.geoApiKey } })
      .pipe(catchError(this.handleError<ErrorModel>('Error occured')));
  }

  /**
   * Method to handle errors in network communication
   * @param operation
   * @param result
   * @returns
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
