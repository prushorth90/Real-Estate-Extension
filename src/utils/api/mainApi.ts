export abstract class API {
  public abstract fetchData(...args : any[]) : Promise<any>;
}
