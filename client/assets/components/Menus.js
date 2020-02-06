import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

export default function Menus(props = { menus: [] }) {
  const { menus, location } = props;
  return (
    <Menu theme="dark" defaultSelectedKeys={[location.pathname]}>
      {menus.map(item => (
        <Menu.Item key={item.path}>
          <Link to={item.path}>
            <Icon type={item.icon} />
            <span>{item.title}</span>
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );
}
