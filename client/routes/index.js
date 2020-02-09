import { connect } from 'react-redux';
import Routes from '@/assets/components/Routes';
import Menus from '@/assets/components/Menus';
import { constantRoutes } from './config';

export const MenuList = connect(state => ({
  menus: [...constantRoutes, ...state.system.routes],
}))(Menus);

export const RouteList = connect(state => ({
  routes: [...constantRoutes, ...state.system.routes],
}))(Routes);
