import { handleActions } from 'redux-actions';
import { MAIN_INIT_ROUTES } from '../actionTypes';

const defaultState = {
  routes: [],
};

const main = handleActions(
  {
    [MAIN_INIT_ROUTES]: (state, { payload }) => {
      return { routes: payload };
    },
  },
  defaultState
);

export default main;
