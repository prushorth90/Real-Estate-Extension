export class NearbyPlaceAPIInput {
  public radius: string
  public type: string
  //either type or cuisine
  public keyword: string
  public minprice: string
  public maxprice: string

  public constructor(type) {
    this.radius = "1500"
    this.type= type
    this.keyword = type
    this.minprice= "0"
    this.maxprice = "4"

  }
}
