import React from 'react';
import { Alert } from 'antd';
import { Route } from 'react-router';
import Menu121 from './menu1-2-1';
import Menu122 from './menu1-2-2';

function NestRouter() {
  return (
    <div>
      Menu1-2
      <Route path="menu1-2-1" component={Menu121} />
      <Route path="/nested/menu1/menu1-2/menu1-2-2" component={Menu122} />
    </div>
  );
}

export default function() {
  return <Alert message={<NestRouter />} type="error" />;
}
