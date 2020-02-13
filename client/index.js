import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { ConfigProvider } from 'antd';
import store, { persistor } from '@/store';
import systemActions from '@/store/actions/system';
import MainLayout from './layout/main';
import LoginLayout from './layout/login';
import NotFoundLayout from './layout/404';
import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';
import './assets/css/index.css';

class App extends React.Component {
  render() {
    const {
      system: { lang },
    } = store.getState();
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConfigProvider locale={lang === 'zh' ? zhCN : enUS}>
            <Router>
              <Switch>
                <Route exact path="/" render={() => <Redirect to="/home" push />} />
                <Route exact path="/404" component={NotFoundLayout} />
                <Route exact path="/login" component={LoginLayout} />
                <Route path="/" component={MainLayout} />
              </Switch>
            </Router>
          </ConfigProvider>
        </PersistGate>
      </Provider>
    );
  }
}
Promise.all([
  store.dispatch(systemActions.systemInitRoutes()),
  store.dispatch(systemActions.systemInitLang()),
]).then(() => {
  ReactDOM.render(<App />, document.getElementById('app'));
});
