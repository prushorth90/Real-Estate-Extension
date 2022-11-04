import { OpenWeatherData, OpenWeatherTempScale } from './weatherIndex';
import {API} from '../mainApi';

export class WeatherAPI extends API {

  private readonly OPEN_WEATHER_API_KEY = 'd254575234e10077e2968b127e6aa085';
  // public constructor(apiKey){
  //   super(apiKey);
  // }

  public async fetchData(city: string,  tempScale: OpenWeatherTempScale): Promise<OpenWeatherData> {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${tempScale}&appid=${this.OPEN_WEATHER_API_KEY}`
    )
    // for bs.ts and wc.tsx if the thing fails
    if (!res.ok) {
      throw new Error('City not found')
    }

    const data: OpenWeatherData = await res.json()
    return data
  }

  public getWeatherIconSrc(iconCode: string) {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  }


}
