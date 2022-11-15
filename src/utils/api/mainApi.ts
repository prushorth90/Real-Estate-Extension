export abstract class API {
  // private apiKey : string;
  //
  // public constructor(apiKey) {
  //   this.apiKey = apiKey;
  // }
  //
  // public getApiKey(): string {
  //   return this.apiKey;
  // }
  // changed from string[] to any[]
  public abstract fetchData(...args : any[]) : Promise<any>;


}
