import React from 'react';
import { Alert } from 'antd';
import Menu11 from './menu1-1';
import Menu12 from './menu1-2';
import Menu13 from './menu1-3';
import { Route } from 'react-router-dom';

function NestRouter() {
  return (
    <div>
      Menu1
      <Route path="/nested/menu1/menu1-1" component={Menu11} />
      <Route path="/nested/menu1/menu1-2" component={Menu12} />
      <Route path="/nested/menu1/menu1-3" component={Menu13} />
    </div>
  );
}

export default function() {
  return <Alert message={<NestRouter />} type="warning" />;
}
