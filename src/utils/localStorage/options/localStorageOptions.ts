import {LocalStorage} from '../localStorage';
import {LocalStorageVal} from '../localStorageVal';
import {LocalStorageKeys} from '../localStorageKey';
import {Options} from './options';

export class LocalStorageOption implements LocalStorage  {

  public setStored(options: Options): Promise<void> {
    const vals: LocalStorageVal = {
      options,
    }
    return new Promise((resolve) => {
      chrome.storage.local.set(vals, () => {
        resolve()
      })
    })
  }

  public getStored(): Promise<Options> {
    const keys: LocalStorageKeys[] = ['options']
    return new Promise((resolve) => {
      chrome.storage.local.get(keys, (res: LocalStorageVal) => {
        resolve(res.options)
      })
    })
  }
}
