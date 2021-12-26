import {createFeatureSelector} from "@ngrx/store";

export const selectWeatherByDays = createFeatureSelector('weatherByDays');
export const selectWeatherByHours = createFeatureSelector('weatherByHours');
