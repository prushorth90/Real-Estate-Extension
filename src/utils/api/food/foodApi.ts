import { NearbySearchData} from './foodIndex';
import {API} from '../mainApi';
import {Address, AddressData} from '../address/addressIndex'
import {APIInput} from '../../../components/foodPopup/filters/apiInput'
export class FoodAPI extends API {

  private readonly NEARBY_SEARCH_API_KEY = 'AIzaSyDbq-ALkqgJHFvNBDQc-1MJjCk6schskEw';

  // https://developer.chrome.com/docs/extensions/mv3/tut_oauth/
  public async fetchData(coord, apiInput): Promise<NearbySearchData> {
    let latitude = coord.results[0].geometry.location.lat
    let longitude = coord.results[0].geometry.location.lng
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${apiInput.keyword}&location=${latitude}%2C${longitude}&radius=${apiInput.radius}&type=${apiInput.type[1]}&minprice=${apiInput.minprice}&maxprice=${apiInput.maxprice}&key=${this.NEARBY_SEARCH_API_KEY}`
    )

    if (res.status==400) {
      throw new Error('not found')
    }

    const data: NearbySearchData = await res.json()
    return data
  }


}