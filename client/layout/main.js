import React from 'react';
import { Layout, Icon } from 'antd';
import { MenuList, RouteList, Breadcrumbs } from '@/routes';
import config from '@/config';

export default class MainLayout extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
    };
  }

  componentDidMount() {
    // console.log(this);
  }

  toggle() {
    const { collapsed } = this.state;
    this.setState({ collapsed: !collapsed });
  }

  render() {
    const { Header, Content, Sider } = Layout;
    const { collapsed } = this.state;
    const { location } = this.props;
    return (
      <Layout className="o-layout">
        <Sider trigger={null} collapsible collapsed={collapsed} className="o-layout__sidebar">
          <div className="o-layout__logo" />
          <div data-step="1" data-intro="This is Menu" data-position="right">
            <MenuList location={location} />
          </div>
        </Sider>
        <Layout className="o-layout__right">
          <Header className="o-layout__header">
            <div data-step="2" data-intro="Click to unfold then Menu" data-position="right">
              <Icon
                className="o-layout__trigger"
                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle.bind(this)}
              />
            </div>
            <Breadcrumbs location={location} />
          </Header>
          <Content className="o-layout__content">
            <div data-step="3" data-intro="This is main Content" data-position="top">
              <RouteList titleSuffix={config.documentTitleSuffix} />
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
