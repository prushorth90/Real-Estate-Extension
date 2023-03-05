export class Address {
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

  public getStreet() : string {
    return this.street
  }
  public getCity() : string {
    return this.city
  }
  public getState() : string {
    return this.state
  }
  public getZipCode() : string {
    return this.zipCode
  }
  private divideURL(url: string) : string[]{
    let addressURL = this.removeSubURL(url)
    let splitAddressURL = this.splitAddressURL(addressURL)
    return splitAddressURL
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
