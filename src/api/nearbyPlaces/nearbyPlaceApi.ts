import { NearbyPlaceData} from './nearbyPlaceIndex';
import {API} from '../mainApi';
export class NearbyPlaceAPI implements API {


  // https://developer.chrome.com/docs/extensions/mv3/tut_oauth/
  public async fetchData(coord, apiInput): Promise<NearbyPlaceData> {
    let latitude = coord.results[0].geometry.location.lat
    let longitude = coord.results[0].geometry.location.lng
    const res = await fetch(
      `https://prushorthrealestate.wl.r.appspot.com/api/${apiInput.keyword}/${latitude}/${longitude}/${apiInput.radius}/${apiInput.type[1]}/${apiInput.minprice}/${apiInput.maxprice}`
    )

    if (res.status==400) {
      throw new Error('not found')
    }

    const data: NearbyPlaceData = await res.json()
    return data
  }


}