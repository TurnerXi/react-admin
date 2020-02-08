import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '@/store';
import MainLayout from './layout/main';
import LoginLayout from './layout/login';
import NotFoundLayout from './layout/404';
import './assets/css/index.css';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/home" push />} />
              <Route exact path="/404" component={NotFoundLayout} />
              <Route exact path="/login" component={LoginLayout} />
              <Route path="/" component={MainLayout} />
            </Switch>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('app'));
