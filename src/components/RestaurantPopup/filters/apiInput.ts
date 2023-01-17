export class APIInput {
  // could make obj for apartment like open weather data
  public radius: string
  public type: string
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


  public getRadius() : string {
    return this.radius
  }
  public getType() : string {
    return this.type
  }
  public getKeyword() : string {
    return this.keyword
  }
  public getMinPrice() : string {
    return this.minprice
  }
  public getMaxPrice() : string {
    return this.maxprice
  }
}

// export class APIInput {
//   // could make obj for apartment like open weather data
//   public radius: [string,string]
//   public type: [string,string]
//   public keyword: [string,string]
//   public minprice: [string,string]
//   public maxprice: [string,string]
//
//   public constructor() {
//     this.radius = ["Radius", "1500"]
//     this.type= ["Type","Bakery"]
//     this.keyword = ["Keyword", "Bakery"]
//     this.minprice= ["Min Price Level", "0"]
//     this.maxprice = ["Max Price Level", "4"]
//
//   }
//
//
//   public getRadius() : string {
//     return this.radius[1]
//   }
//   public getType() : string {
//     return this.type[1]
//   }
//   public getKeyword() : string {
//     return this.keyword[1]
//   }
//   public getMinPrice() : string {
//     return this.minprice[1]
//   }
//   public getMaxPrice() : string {
//     return this.maxprice[1]
//   }
// }
