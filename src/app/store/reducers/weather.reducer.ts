import * as AppActions from '../actions/weather.actions';
// import * as appState from '../state/app.state'
// import {WeatherActions} from "../actions/weather.actions";
// import {WeatherState} from "../state/weather.state";
import {createReducer, on} from "@ngrx/store";
import {cityCoords, tzDays, tzHours, weatherByDays, weatherByHours} from "../actions/weather.actions";

const weatherByDaysInitialState = null;
const weatherByHoursInitialState = null;
const cityCoordinatesInitialState = null;
const tzDaysInitialState = '';
const tzHoursInitialState = '';

// export function cityCoordsPayload(action: any, state: any) {
//   return state.weatherByDays = action.payload
// }

export const weatherByDaysReducer = createReducer(
  weatherByDaysInitialState,
  on(weatherByDays, (state, { coords }) => coords)
);

export const weatherByHoursReducer = createReducer(
  weatherByHoursInitialState,
  on(weatherByHours, (state, { coords }) => coords)
);

export const tzDaysReducer = createReducer(
  tzDaysInitialState,
  on(tzDays, (state, { timezone }) => timezone)
);

export const tzHoursReducer = createReducer(
  tzHoursInitialState,
  on(tzHours, (state, { timezone }) => timezone)
);

export const cityCoordinatesReducer = createReducer(
  cityCoordinatesInitialState,
  on(cityCoords, (state, { city }) => city)
);

// export const weatherReducer = (state: WeatherState = initialAppState, action: AppActions.WeatherActions) => {
// 	switch (action.type) {
// 		case AppActions.WEATHER_BY_DAY:
// 		  const weatherByDay = cityCoordsPayload(action, state)
//       console.log(action.payload);
//       return {
//         ...state,
//         weatherByDay
//       };
// 		case AppActions.WEATHER_BY_HOUR:
// 			return {
// 			  ...state,
//         weatherByHours: action.payload
// 			};
// 		case AppActions.CITY_COORDINATES:
//       return {
//         ...state,
//         cityCoordinates: action.payload
//       };
//     case AppActions.CITY_COORDINATES_SUCCESS:
//       return {
//         ...state,
//         cityCoordinatesSuccess: action.payload
//       };
// 		default:
// 			return state;
// 	}
// }
