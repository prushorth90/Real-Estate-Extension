import {LocalStorage} from '../localStorage';
import {Options} from '../options/options';
import {LocalStorageVal} from '../localStorageVal';
import {LocalStorageKeys} from '../localStorageKey';

export class LocalStorageCity implements LocalStorage  {
  cities?: string[];
  options?: Options;

  public setStored(cities: string[]): Promise<void> {
    const vals: LocalStorageVal = { cities,}
    return new Promise((resolve) => {
      chrome.storage.local.set(vals, () => { resolve() })
    })
  }

  public getStored(): Promise<string[]> {
    const keys: LocalStorageKeys[] = ['cities']
    return new Promise((resolve) => {
      chrome.storage.local.get(keys, (res: LocalStorageVal) => {
        resolve(res.cities ?? [])
      })
    })
  }

}
