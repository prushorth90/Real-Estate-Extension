import { AddressData} from './addressIndex';
import {API} from '../mainApi';
import {Address} from './address'
export class AddressAPI extends API {

  private readonly ADDRESS_API_KEY = 'AIzaSyDbq-ALkqgJHFvNBDQc-1MJjCk6schskEw';

  public async fetchData(address: Address): Promise<AddressData> {
    let street = address.getStreet()
    let city = address.getCity()
    let state = address.getState()
    let zipCode = address.getZipCode()
    //https://www.w3schools.com/jsref/api_fetch.asp
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${street}%2C${city}%2C${state}%2C${zipCode}&key=${this.ADDRESS_API_KEY}`
    )
    const data: AddressData = await res.json()
    return data
  }


}
