import { NearbySearchData} from './restaurantIndex';
import {API} from '../mainApi';
import {Address} from '../../../popup/Address/address'
export class RestaurantAPI extends API {

  private readonly NEARBY_SEARCH_API_KEY = 'AIzaSyDbq-ALkqgJHFvNBDQc-1MJjCk6schskEw';
  // public constructor(apiKey){
  //   super(apiKey);
  // }

  public async fetchData(address: Address): Promise<NearbySearchData> {
    let latitude =-33.8670522
    let longitude =151.1957362
    //`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${tempScale}&appid=${this.NEARBY_SEARCH_API_KEY}`
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=cruise&location=${latitude}%2C${longitude}&radius=1500&type=restaurant&key=${this.NEARBY_SEARCH_API_KEY}`
    )
    // for bs.ts and wc.tsx if the thing fails // &type=indian
    if (!res.ok) {
      throw new Error('not found')
    }

    const data: NearbySearchData = await res.json()
    return data
  }


}