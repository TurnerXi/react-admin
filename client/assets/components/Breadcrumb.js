import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import I18nProvider from '@/lang';
import { FormattedMessage } from 'react-intl';

function mapRoutesToObject(routes) {
  const map = {};
  routes.forEach(item => {
    map[item.path] = item.title;
  });
  return map;
}

export default function CustomBreadcrumb({ routes, location }) {
  const routerMap = mapRoutesToObject(routes);
  const snippets = location && location.pathname.split('/').slice(1);
  const extras = [];
  snippets.reduce((url, item) => {
    url += item;
    if (routerMap[url] && url !== '/home') {
      extras.push(
        <Breadcrumb.Item key={url}>
          <Link to={url}>
            <FormattedMessage id={routerMap[url]} />
          </Link>
        </Breadcrumb.Item>
      );
    }
    return url + '/';
  }, '/');

  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">
        <FormattedMessage id="dashboard" />
      </Link>
    </Breadcrumb.Item>,
  ].concat(extras);

  return (
    <I18nProvider scope="route">
      <Breadcrumb>{breadcrumbItems}</Breadcrumb>
    </I18nProvider>
  );
}
