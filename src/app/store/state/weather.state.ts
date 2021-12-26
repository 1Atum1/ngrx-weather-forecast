import {CityModel} from "../../city-model";
import {WeatherModel} from "../../weather-model";

export interface WeatherState {
    weatherByDays: WeatherModel;
    tzDays: string;
    tzHours: string;
    weatherByHours: WeatherModel;
    cityCoordinated: CityModel;
}
