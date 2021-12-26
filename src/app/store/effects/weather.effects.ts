import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {debounceTime, map, switchMap, tap} from 'rxjs/operators';
import { of } from 'rxjs';
import { CityService } from '../../city.service';
import * as weatherActions from '../actions/weather.actions'
import {cityCoords, weatherByDays} from '../actions/weather.actions';
import {WeatherService} from "../../weather.service";

@Injectable()
export class WeatherEffects {

	// @Effect()
	// loadCityCoords$ = this.actions$.pipe(
  //   debounceTime(500),
	// 	ofType<cityCoords>(weatherActions.CITY_COORDINATES),
	// 	map(action => action.payload),
	// 	switchMap((action: any) => {
  //     console.log(action);
  //     return this.cityService.getCityCoord(action)
  //   }),
	// 	switchMap((result) => of(new cityCoordsSuccess(result)))
	// )

  // @Effect()
  // loadWeatherByDays$ = this.actions$.pipe(
  //   ofType<cityCoordsSuccess>(weatherActions.CITY_COORDINATES_SUCCESS),
  //   map(action => action.payload),
  //   switchMap((action: any) => {
  //     return this.weatherService.getWeatherByDays(action)
  //   }),
  //   tap(v => console.log(v)),
  //   switchMap(result => of(new GetWeatherByDays(result)))
  // )

	// constructor(
	// 	private actions$: Actions,
	// 	private cityService: CityService,
  //   private weatherService: WeatherService
	// ) {}
}
