export class APIInput {
  public radius: string
  public type: string
  //either type or cuisine
  public keyword: string
  public minprice: string
  public maxprice: string

  public constructor() {
    this.radius = "1500"
    this.type= "Bakery"
    this.keyword = "Bakery"
    this.minprice= "0"
    this.maxprice = "4"

  }
}
