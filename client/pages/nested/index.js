import React from 'react';
import { Alert, Card } from 'antd';
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

export default function({ title }) {
  return (
    <Card title={title}>
      <Alert
        message="嵌套路由配置方式, 在菜单级路由配置组件, 在对应组件中添加子路由"
        description="路由匹配规则中，若路由包含子级，则为非精确匹配路由，否则为精确匹配"
        showIcon
        type="info"
      />
      <br />
      <Alert message={<NestedRouter />} type="info" />
    </Card>
  );
}
