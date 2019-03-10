/**
 * Inspired by https://github.com/async-labs/saas/blob/master/app/lib/store/index.ts
 */

import * as mobx from 'mobx';
import { decorate } from 'mobx';

mobx.configure({ enforceActions: 'observed' });

class Store {
  public isServer: boolean;


  public isLoadingTeams = false;
  public isInitialTeamsLoaded = false;


  public currentUrl: string = '';
  public isLoggingIn = true;

  constructor({ initialState = {}, isServer }: { initialState?: any; isServer: boolean }) {
    this.isServer = !!isServer;
  }



}

decorate(Store, {
});

let store: Store = null;

function initStore(initialState = {}) {
  if (!process.browser) {
    return new Store({ initialState, isServer: true });
  } else {
    if (store === null) {
      store = new Store({ initialState, isServer: false });
    }

    return store;
  }
}

function getStore() {
  return store;
}

export { Store, initStore, getStore };