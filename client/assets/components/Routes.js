import React from 'react';
import Loadable from 'react-loadable';
import { Route, Switch, Redirect } from 'react-router-dom';
import DocumentTitle from 'react-document-title';

export default function Routes(props = { routes: [], titleSuffix: '' }) {
  const { routes, titleSuffix } = props;
  return (
    <Switch>
      {routes.map(item => {
        const Component = resolveComponent(item.component);
        return (
          <Route
            exact
            key={item.path || item.title}
            path={item.path}
            render={p => <Component {...p} title={item.title + ' - ' + titleSuffix} />}
          />
        );
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
    render(loaded, props) {
      let Component = loaded.default;
      return (
        <DocumentTitle title={props.title}>
          <Component {...props} />
        </DocumentTitle>
      );
    },
    pastDelay: 200,
  });
}
