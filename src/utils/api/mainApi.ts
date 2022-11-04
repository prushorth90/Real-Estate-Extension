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

  public abstract fetchData(...args : string[]) : Promise<any>;


}
