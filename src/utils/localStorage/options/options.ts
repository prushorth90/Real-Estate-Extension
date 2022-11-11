import { OpenWeatherTempScale } from '../../api/weather/weatherIndex';

export interface Options {
  hasAutoOverlay: boolean
  homeCity: string
  tempScale: OpenWeatherTempScale
}
