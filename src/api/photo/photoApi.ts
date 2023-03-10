import {API} from '../mainApi';

export class PhotoAPI implements API {

  private readonly NEARBY_SEARCH_API_KEY = 'AIzaSyDbq-ALkqgJHFvNBDQc-1MJjCk6schskEw';
  //https://www.w3schools.com/jsref/api_fetch.asp
  public async fetchData(photo_reference) {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${window.innerWidth}&photo_reference=${photo_reference}&key=${this.NEARBY_SEARCH_API_KEY}`
    )
    return res
  }


}
