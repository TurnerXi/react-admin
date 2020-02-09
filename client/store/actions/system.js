import { createActions } from 'redux-actions';
import MenuAPI from '@/api/menu';
import LangAPI from '@/api/lang';
import { SYSTEM_INIT_ROUTES, SYSTEM_INIT_LANG, SYSTEM_SET_LOCALE } from '../actionTypes';

export default createActions({
  [SYSTEM_INIT_ROUTES]: async () => await MenuAPI.tree(),
  [SYSTEM_INIT_LANG]: async () => await LangAPI.list(),
  [SYSTEM_SET_LOCALE]: lang => lang,
});
