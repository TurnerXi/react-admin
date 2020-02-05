import React from 'react';
import { Button } from 'antd';

export default class Login extends React.Component {
  render() {
    const { isLogin, onSubmit } = this.props;
    return (
      <div>
        <h1>Login page</h1>
        <div>
          is login:
          {isLogin ? 'YES' : 'NO'}
        </div>
        <div>
          <Button onClick={onSubmit}>do login</Button>
        </div>
      </div>
    );
  }
}
