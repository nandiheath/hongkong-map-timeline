import React from 'react';

import { getStore, initStore, Store } from './store';

export default function withStore(App) {
  class AppWithMobx extends React.Component {
    public static async getInitialProps(appContext) {
      let appProps = {};
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps.call(App, appContext);
      }

      // if store initialized already, do not load data again
      if (getStore()) {
        return appProps;
      }

      // const { ctx } = appContext;



      return {
        ...appProps,
        initialState: { },
      };
    }

    private store: Store;

    constructor(props) {
      super(props);

      this.store = initStore(props.initialState);
    }

    public render() {
      return <App {...this.props} mobxStore={this.store} />;
    }
  }

  return AppWithMobx;
}