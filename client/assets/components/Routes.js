import React from 'react';
import Loadable from 'react-loadable';
import { Route, Switch, Redirect } from 'react-router-dom';

export default function Routes(props = { routes: [] }) {
  const { routes } = props;
  return (
    <Switch>
      {routes.map(item => {
        const Component = resolveComponent(item.component);
        return <Route exact key={item.path} path={item.path} component={Component} />;
      })}
      <Route render={() => <Redirect to="/404" />} />
    </Switch>
  );
}

function resolveComponent(path) {
  return Loadable({
    loader: () => {
      return import(`@/pages${path}`);
    },
    loading(prop) {
      if (prop.error) {
        return <div>{prop.error}</div>;
      } else if (prop.pastDelay) {
        return <div>Loading...</div>;
      }
      return null;
    },
    pastDelay: 200,
  });
}
