import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import MenuAPI from '@/api/menu';
import Home from '../pages/home';

export default class MainLayout extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
    };
  }

  componentDidMount() {
    MenuAPI.listMenus().then(data => console.log(data));
  }

  toggle() {
    const { collapsed } = this.state;
    this.setState({ collapsed: !collapsed });
  }

  render() {
    const { Header, Content, Sider } = Layout;
    const { Item: MenuItem } = Menu;
    const { collapsed } = this.state;
    return (
      <Layout className="o-layout">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="o-layout__logo" />
          <Menu theme="dark">
            <MenuItem>1</MenuItem>
            <MenuItem>2</MenuItem>
          </Menu>
        </Sider>
        <Layout>
          <Header className="o-layout__header">
            <Icon
              className="o-layout__trigger"
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle.bind(this)}
            />
          </Header>
          <Content className="o-layout__content">
            <Switch>
              <Route exact path="/home" component={Home} />
              <Route render={() => <Redirect to="/404" />} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
