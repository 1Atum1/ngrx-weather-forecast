import { Component, OnDestroy, OnInit } from '@angular/core';
import { CityService } from './city.service';
import { WeatherService } from './weather.service';
import { CityModel } from './city-model';
import {Store} from '@ngrx/store';
import {iif, Observable, of, Subject, Subscription} from 'rxjs';
import {catchError, debounceTime, map, switchMap, take, tap} from "rxjs/operators";
import {WeatherState} from "./store/state/weather.state";
import {selectWeatherByDays, selectWeatherByHours} from "./store/selectors/weather.selectors";
import {cityCoords, weatherByDays, weatherByHours} from "./store/actions/weather.actions";
import {HttpErrorResponse} from "@angular/common/http";
import {WeatherModel} from "./weather-model";

export enum weatherType {
	date,
	hour
}

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
	title = 'weather-forecast';

	public city: string | undefined
	public weatherTypeRadio: number = weatherType.date;
	public weatherType = weatherType;

	public tableDays$: Observable<any> | undefined;
	public tableHours$: Observable<any> | undefined;

	public timeZoneDaily: string | undefined;
	public timeZoneHourly: string | undefined;

	private modelChanged: Subject<string> = new Subject<string>();
	private subscription: Subscription | any;

	public error: boolean | undefined

	constructor(
		private cityService: CityService,
		private weatherService: WeatherService,
		private store: Store<WeatherState>) {
	}

	ngOnInit() {
    this.tableDays$ = this.store.select(selectWeatherByDays);
    this.tableHours$ = this.store.select(selectWeatherByHours);

		this.subscription = this.modelChanged
			.pipe(
				debounceTime(500),
				switchMap( (query: any) => iif(() => query.length, this.cityService.getCityCoord(query), of([]))),
				tap(coords => this.store.dispatch(cityCoords({city: coords}))),
				switchMap((coords: CityModel[]) => {
					if (coords.length && this.weatherTypeRadio === weatherType.date) {
            return this.weatherService.getWeatherByDays(coords)
              .pipe(
              catchError((error) => this.handleError(error))
            );
					} else if (coords.length && this.weatherTypeRadio === weatherType.hour) {
            return this.weatherService.getWeatherByHours(coords)
              .pipe(
              catchError((error) => this.handleError(error))
            );
					} else {
						return of(coords)
					}
				}),
				switchMap(coords => {
          if (coords.timezone && this.weatherTypeRadio === weatherType.date) {
				    return of(coords)
          } else if (coords.timezone && this.weatherTypeRadio === weatherType.hour) {
            return of({
              ...coords,
              hourly: coords.hourly.filter((value: any, index: number) => index % 3 == 0)
            })
          } else {
            return of(coords)
          }
        }),
				tap((source: WeatherModel | any) => {
          if (this.weatherTypeRadio === weatherType.date) {
            console.log(source);
            this.timeZoneDaily = source.timezone;
          }
          if (this.weatherTypeRadio === weatherType.hour) {
            this.timeZoneHourly = source.timezone;
          }
        }),
				tap((source: WeatherModel | any) => {
          let data
          if (source.timezone) {
            data = this.weatherTypeRadio === weatherType.date ? source.daily : source.hourly
            data = data.map((row: any) => {
              return {
                ...row,
                dt: new Date(row.dt * 1000 - (source.timezone_offset * 1000))
              }
            });
          } else {
            data = null
          }
          this.store.dispatch(this.weatherTypeRadio === weatherType.date ?
            weatherByDays({coords: data}) :
            weatherByHours({coords: data}))
        }
			))
			.subscribe(v => {
				console.log(v);
			});
	}

  searchCity(type: string) {
    if (this.city !== null &&
      (type === 'input' ||
      (type === 'radio' && (!this.getState().weatherByDays || !this.getState().weatherByHours)))
    ) {
      this.modelChanged.next(this.city);
    }

	}

	getState() {
	  let state: any
	  this.store.pipe(take(1)).subscribe(s => state = s)
    return state;
  }

  handleError(error: HttpErrorResponse) {
    this.error = true;
    console.log(error);
    return of([]);
  }

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
