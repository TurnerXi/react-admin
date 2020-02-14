import { connect } from 'react-redux';
import Routes from '@/assets/components/Routes';
import Menus from '@/assets/components/Menus';
import Breadcrumb from '@/assets/components/Breadcrumb';
import { constantRoutes } from './config';
import { plainObjectArr } from '@/utils';

export const MenuList = connect(state => ({
  menus: [...constantRoutes, ...state.system.routes],
}))(Menus);

export const RouteList = connect(state => {
  const routes = [...constantRoutes, ...state.system.routes];
  return {
    routes: plainObjectArr(routes, 'children').filter(item => item.component),
  };
})(Routes);

export const Breadcrumbs = connect(state => {
  const routes = [...constantRoutes, ...state.system.routes];
  return {
    routes: plainObjectArr(routes, 'children').filter(item => item.component),
  };
})(Breadcrumb);
