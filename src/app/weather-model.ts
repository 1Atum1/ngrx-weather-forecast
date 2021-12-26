export interface WeatherModel {
  daily?: any[],
  hourly?: any[],
  lat: number,
  lon: number,
  timezone: string
  timezone_offset: number
}
