import React from 'react';
import { Alert } from 'antd';
import { Route, Switch } from 'react-router-dom';
import Menu1 from './menu1';
import Menu2 from './menu2';

function NestedRouter() {
  return (
    <div>
      Nested
      <Switch>
        <Route path="/nested/menu1" component={Menu1} />
        <Route path="/nested/menu2" component={Menu2} />
      </Switch>
    </div>
  );
}

export default function() {
  return (
    <div>
      <Alert message={<NestedRouter />} type="info" />
    </div>
  );
}
