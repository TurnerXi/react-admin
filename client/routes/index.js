import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import Home from '../pages/home';

export default class CRouter extends React.Component {
  render() {
    const { Header, Content, Footer } = Layout;
    return (
      <Layout>
        <Header>header</Header>
        <Content>
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route render={() => <Redirect to="/404" />} />
          </Switch>
        </Content>
        <Footer>footer</Footer>
      </Layout>
    );
  }
}
