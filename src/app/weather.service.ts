import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CityModel } from './city-model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

	private apiKey = ''

	constructor(private http: HttpClient) { }

	getWeatherByDays(coords: any): Observable<any> {
		console.log(coords);
		return this.http.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coords[0].lat}&lon=${coords[0].lon}&exclude=current,minutely,hourly,alerts&appid=${this.apiKey}&units=metric`)
	}

	getWeatherByHours(coords: CityModel[]): Observable<any> {
		console.log(coords);
		return this.http.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coords[0].lat}&lon=${coords[0].lon}&exclude=current,minutely,daily,alerts&appid=${this.apiKey}&units=metric`)
	}
}
