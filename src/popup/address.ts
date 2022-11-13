export class Address {
  // could make obj for apartment like open weather data
  private street: string
  private city: string
  private state: string
  private zipCode: string

  public constructor(url: string) {
    let splitAddressURL = this.divideURL(url)
    this.street = splitAddressURL[0]
    this.city = splitAddressURL[1]
    this.state = splitAddressURL[2]
    this.zipCode = splitAddressURL[3]

  }

  private divideURL(url: string) : void{
    let addressURL = this.removeSubURL(url)
    let splitAddressURL = this.splitAddressURL(addressURL)

  }

  private removeSubURL(url: string): string {
    //"https://www.realtor.com/realestateandhomes-detail/1414-170th-Pl-NE_Bellevue_WA_98008_M13563-86961"
    let detailIndex = url.indexOf("detail")
    //detail/1414-170th-Pl-NE_Bellevue_WA_98008_M13563-86961
    let subURL = url.slice(detailIndex,url.length)
    let slashIndex = subURL.indexOf("/")
    // 1414-170th-Pl-NE_Bellevue_WA_98008_M13563-86961
    let addressURL= subURL.slice(slashIndex+1,subURL.length)
    return addressURL
  }

  private splitAddressURL(addressURL: string): string[] {
    let splitAddressURL = addressURL.split("_")
    splitAddressURL.pop()
    return splitAddressURL
    // 0:"1414-170th-Pl-NE"
    // 1:"Bellevue"
    // 2:"WA"
    // // 3:"98008"
  }
}
