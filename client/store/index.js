import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise';
import reducers from './reducers';

const storeEnhancers = compose(
  applyMiddleware(promiseMiddleware),
  (window && window.devToolsExtension()) || (f => f)
);
export default createStore(reducers, storeEnhancers);
