import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';

import promiseMiddleware from 'redux-promise';
import reducers from './reducers';

const storeEnhancers = compose(
  applyMiddleware(promiseMiddleware),
  (window && window.devToolsExtension()) || (f => f)
);

const store = createStore(reducers, storeEnhancers);

export const persistor = persistStore(store);

export default store;
