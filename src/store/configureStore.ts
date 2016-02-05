// This file merely configures the store for hot reloading.
// This boilerplate file is likely to be the same for each project that uses Redux.
// With Redux, the actual stores are in /reducers.

import { createStore } from 'redux';
import rootReducer from '../reducers';

export default function configureStore(initialState: any = undefined) {
  const store = createStore(rootReducer, initialState);

  if ((<any>window).module && (<any>window).module.hot) {
    // Enable Webpack hot module replacement for reducers
    (<any>window).module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
