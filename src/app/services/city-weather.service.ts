import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {IWeatherApi} from '../models/weather-api.interface';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {Store} from '@ngxs/store';
import {AddCityWeather} from '../state/city-weather.actions';
import {MatSnackBar} from '@angular/material/snack-bar';
import {EMPTY, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CityWeatherService {
  private readonly WEATHER_API_URL = 'http://localhost:3000/v1/weather-api/';
  private headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Headers', 'Content-Type')
      .append('Access-Control-Allow-Methods', 'GET')
      .append('Access-Control-Allow-Origin', '*');

  private okOptions = {
    duration: 2000,
    panelClass: ['blue-snackbar'],
  };

  private errorOptions = {
    duration: 3000,
    panelClass: ['red-snackbar'],
  };

  constructor(private httpClient: HttpClient, private store: Store, private snackBar: MatSnackBar) { }

  getCityWeather(cityname: string): Observable<any> {
    return this.httpClient.get<IWeatherApi>(`${this.WEATHER_API_URL}${cityname}`, {headers: this.headers}).pipe(
        switchMap((response: IWeatherApi) => this.store.dispatch(new AddCityWeather({...response, city: cityname}))),
        tap(() => this.snackBar.open(`${cityname} added`, undefined, this.okOptions)),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            this.snackBar.open(`${cityname} not found`, undefined, this.errorOptions);
          } else {
            this.snackBar.open(`internal server error`, undefined, this.errorOptions);
          }
          return EMPTY;
        }),
    );
  }
}

