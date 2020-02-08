import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { handleActions } from 'redux-actions';
import { MAIN_INIT_ROUTES } from '../actionTypes';

const persistConfig = {
  key: 'main',
  storage,
};

const defaultState = {
  routes: [],
};

const main = handleActions(
  {
    [MAIN_INIT_ROUTES]: (state, { payload }) => {
      return { routes: payload || [] };
    },
  },
  defaultState
);

export default persistReducer(persistConfig, main);
