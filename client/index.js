import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/login';
import NotFound from './pages/common/404';
import Routes from './routes';
import './assets/css/index.css';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/app/home" push />} />
          <Route exact path="/404" component={NotFound} />
          <Route exact path="/login" component={Login} />
          <Route path="/" component={Routes} />
        </Switch>
      </Router>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('app'));
