export interface API {
  fetchData(...args : any[]) : Promise<any>;
}
