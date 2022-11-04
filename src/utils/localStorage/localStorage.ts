export interface LocalStorage {
  getStored() : Promise<any>;
  setStored(...args) : Promise<any>;
}
