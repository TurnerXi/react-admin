import { createActions } from 'redux-actions';
import { USER_LOGIN } from '../actionTypes';

export default createActions({
  [USER_LOGIN]: () => ({ isLogin: true }),
});
