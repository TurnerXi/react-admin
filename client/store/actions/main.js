import { createActions } from 'redux-actions';
import MenuAPI from '@/api/menu';
import { MAIN_INIT_ROUTES } from '../actionTypes';

export default createActions({
  [MAIN_INIT_ROUTES]: async () => await MenuAPI.list(),
});
