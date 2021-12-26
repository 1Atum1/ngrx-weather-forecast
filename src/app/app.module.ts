import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import {
  cityCoordinatesReducer,
  tzDaysReducer, tzHoursReducer,
  weatherByDaysReducer,
  weatherByHoursReducer
} from './store/reducers/weather.reducer';
import { EffectsModule } from '@ngrx/effects';
import { WeatherEffects } from './store/effects/weather.effects';
import { TableComponent } from './table/table.component';
import {StoreDevtoolsModule} from "@ngrx/store-devtools";

@NgModule({
	declarations: [AppComponent, TableComponent],
	imports: [
		BrowserModule,
		HttpClientModule,
		FormsModule,
		StoreModule.forRoot({
      weatherByDays: weatherByDaysReducer,
      tzDays: tzDaysReducer,
      tzHours: tzHoursReducer,
      weatherByHours: weatherByHoursReducer,
      cityCoordinates: cityCoordinatesReducer
		}),
		EffectsModule.forRoot([WeatherEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
