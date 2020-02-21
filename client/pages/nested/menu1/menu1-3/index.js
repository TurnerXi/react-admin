import React from 'react';
import { Alert } from 'antd';

function NestRouter() {
  return <div>Menu1-3</div>;
}

export default function() {
  return <Alert message={<NestRouter />} type="error" />;
}
