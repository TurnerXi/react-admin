import { handleActions } from 'redux-actions';
import { USER_LOGIN } from '../actionTypes';

const defaultState = {
  isLogin: false
};

const user = handleActions(
  {
    [USER_LOGIN]: state => (state.isLogin ? state : { ...state, isLogin: true })
  },
  defaultState
);

export default user;
