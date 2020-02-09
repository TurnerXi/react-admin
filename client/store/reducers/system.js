import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { handleActions } from 'redux-actions';
import { SYSTEM_INIT_ROUTES, SYSTEM_INIT_LANG, SYSTEM_SET_LOCALE } from '../actionTypes';

const persistConfig = {
  key: 'system',
  storage,
};

const defaultState = {
  routes: [],
  languages: {},
  lang: 'zh',
};

const main = handleActions(
  {
    [SYSTEM_INIT_ROUTES]: (state, { payload }) => {
      return { ...state, routes: payload || [] };
    },
    [SYSTEM_INIT_LANG]: (state, { payload }) => {
      return { ...state, languages: payload || {} };
    },
    [SYSTEM_SET_LOCALE]: (state, { payload }) => {
      return { ...state, lang: payload || 'zh' };
    },
  },
  defaultState
);

export default persistReducer(persistConfig, main);
