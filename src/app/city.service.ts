import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CityModel } from './city-model';

@Injectable({providedIn: 'root'})
export class CityService {

	private apiKey = ''

	constructor(private http: HttpClient) { }

	public getCityCoord(action: any): Observable<any> {
		return this.http.get<CityModel>(`http://api.openweathermap.org/geo/1.0/direct?q=${action}&limit=1&appid=${this.apiKey}`);
	}
}
