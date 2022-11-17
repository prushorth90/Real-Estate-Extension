import { AddressData} from './addressIndex';
import {API} from '../mainApi';
import {Address} from '../../../popup/Address/address'
export class AddressAPI extends API {

  private readonly ADDRESS_API_KEY = 'AIzaSyDbq-ALkqgJHFvNBDQc-1MJjCk6schskEw';
  // public constructor(apiKey){
  //   super(apiKey);
  // }

  public async fetchData(address: Address): Promise<AddressData> {
    let street = address.getStreet()
    let city = address.getCity()
    let state = address.getState()
    let zipCode = address.getZipCode()

    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${street}%2C${city}%2C${state}%2C${zipCode}&key=${this.ADDRESS_API_KEY}`
    )
    //1. https://maps.googleapis.com/maps/api/geocode/json?address=1414-170th-Pl-NE%2CBellevue%2CWA%2C98008&key=AIzaSyDbq-ALkqgJHFvNBDQc-1MJjCk6schskEw

    // for bs.ts and wc.tsx if the thing fails // &type=indian
    if (!res.ok) {
      throw new Error('not found')
    }

    const data: AddressData = await res.json()
    return data
  }


}

//1.
// {
//    "results" : [
//       {
//          "address_components" : [
//             {
//                "long_name" : "1414",
//                "short_name" : "1414",
//                "types" : [ "street_number" ]
//             },
//             {
//                "long_name" : "170th Place Northeast",
//                "short_name" : "170th Pl NE",
//                "types" : [ "route" ]
//             },
//             {
//                "long_name" : "Northeast Bellevue",
//                "short_name" : "Northeast Bellevue",
//                "types" : [ "neighborhood", "political" ]
//             },
//             {
//                "long_name" : "Bellevue",
//                "short_name" : "Bellevue",
//                "types" : [ "locality", "political" ]
//             },
//             {
//                "long_name" : "King County",
//                "short_name" : "King County",
//                "types" : [ "administrative_area_level_2", "political" ]
//             },
//             {
//                "long_name" : "Washington",
//                "short_name" : "WA",
//                "types" : [ "administrative_area_level_1", "political" ]
//             },
//             {
//                "long_name" : "United States",
//                "short_name" : "US",
//                "types" : [ "country", "political" ]
//             },
//             {
//                "long_name" : "98008",
//                "short_name" : "98008",
//                "types" : [ "postal_code" ]
//             },
//             {
//                "long_name" : "3040",
//                "short_name" : "3040",
//                "types" : [ "postal_code_suffix" ]
//             }
//          ],
//          "formatted_address" : "1414 170th Pl NE, Bellevue, WA 98008, USA",
//          "geometry" : {
//             "location" : {
//                "lat" : 47.6226055,
//                "lng" : -122.1128184
//             },
//             "location_type" : "ROOFTOP",
//             "viewport" : {
//                "northeast" : {
//                   "lat" : 47.6239576302915,
//                   "lng" : -122.1116307197085
//                },
//                "southwest" : {
//                   "lat" : 47.6212596697085,
//                   "lng" : -122.1143286802915
//                }
//             }
//          },
//          "place_id" : "ChIJOaqwCpZtkFQRfQd0CP_dyfg",
//          "plus_code" : {
//             "compound_code" : "JVFP+2V Bellevue, WA",
//             "global_code" : "84VVJVFP+2V"
//          },
//          "types" : [ "street_address" ]
//       }
//    ],
//    "status" : "OK"
// }
