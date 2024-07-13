import {Coordinate} from './addressIndex';
import {API} from '../mainApi';
import {Address} from './address'
export class AddressAPI implements API {


  public async fetchData(address: Address): Promise<Coordinate> {
    let street = address.getStreet()
    let city = address.getCity()
    let state = address.getState()
    let zipCode = address.getZipCode()
    //https://www.w3schools.com/jsref/api_fetch.asp
    const res = await fetch(
      `https://prushorthrealestate.wl.r.appspot.com/api/${street}/${city}/${state}/${zipCode}`
    )
    const data: Coordinate = await res.json()
    return data
  }


}
