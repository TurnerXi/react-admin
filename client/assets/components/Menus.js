import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import I18nProvider from '@/lang';
import { FormattedMessage } from 'react-intl';

export default function Menus(props = { menus: [] }) {
  const { menus, location } = props;
  return (
    <I18nProvider scope="route">
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]}>
        {menus.map(mapMenuItem)}
      </Menu>
    </I18nProvider>
  );
}

function mapMenuItem(item) {
  if (item.children) {
    return (
      <Menu.SubMenu key={item.title} title={subMenuTitle(item)}>
        {item.children.map(mapMenuItem)}
      </Menu.SubMenu>
    );
  } else {
    return (
      <Menu.Item key={item.path}>
        <Link to={item.path}>
          {item.icon && <Icon type={item.icon} />}
          <FormattedMessage id={item.title || 'error'} />
        </Link>
      </Menu.Item>
    );
  }
}

function subMenuTitle(item) {
  return (
    <span>
      {item.icon && <Icon type={item.icon} />}
      <span>
        <FormattedMessage id={item.title || 'error'} />
      </span>
    </span>
  );
}
