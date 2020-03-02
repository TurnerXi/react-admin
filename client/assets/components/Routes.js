import React from 'react';
import Loadable from 'react-loadable';
import { Route, Switch, Redirect } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { FormattedMessage } from 'react-intl';
import I18nProvider from '@/lang';
import { Skeleton, Card } from 'antd';

export default function Routes(props = { routes: [], titleSuffix: '' }) {
  const { routes, titleSuffix } = props;
  return (
    <I18nProvider scope="route">
      <Switch>
        {routes.map(item => {
          const Component = resolveComponent(item.component);
          return (
            <Route
              key={item.path || item.title}
              path={item.path}
              exact={!item.children}
              render={p => (
                <FormattedMessage id={item.title}>
                  {msg => <Component {...p} title={msg} titleSuffix={titleSuffix} />}
                </FormattedMessage>
              )}
            />
          );
        })}
        <Route render={() => <Redirect to="/404" />} />
      </Switch>
    </I18nProvider>
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
        return (
          <Card title={<Skeleton active title={{ width: 50 }} paragraph={false} />}>
            <Skeleton active paragraph={{ rows: 20 }} />
          </Card>
        );
      }
      return null;
    },
    render(loaded, props) {
      let Component = loaded.default;
      return (
        <DocumentTitle title={props.title + ' - ' + props.titleSuffix}>
          <Component {...props} />
        </DocumentTitle>
      );
    },
    pastDelay: 200,
  });
}
