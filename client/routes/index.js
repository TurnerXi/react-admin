import { connect } from 'react-redux';
import store from '@/store';
import mainActions from '@/store/actions/main';
import Routes from '@/assets/components/Routes';
import Menus from '@/assets/components/Menus';
import { constantRoutes } from './config';

store.dispatch(mainActions.mainInitRoutes());

export const MenuList = connect(state => ({ menus: [...constantRoutes, ...state.main.routes] }))(
  Menus
);

export const RouteList = connect(state => ({ routes: [...constantRoutes, ...state.main.routes] }))(
  Routes
);
