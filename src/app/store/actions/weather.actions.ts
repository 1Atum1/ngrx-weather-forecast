import {createAction, props} from '@ngrx/store';

export const weatherByDays = createAction(
  '[WEATHER] Get Weather By Days',
  props<{ coords: any }>()
);

export const weatherByHours = createAction(
  '[WEATHER] Get Weather By Hours',
  props<{ coords: any }>()
);

export const tzDays = createAction(
  '[WEATHER] Get Timezone By Days',
  props<{ timezone: any }>()
);

export const tzHours = createAction(
  '[WEATHER] Get Timezone By Hours',
  props<{ timezone: any }>()
);

export const cityCoords = createAction(
  '[WEATHER] City Coordinates',
  props<{ city: any }>()
);
