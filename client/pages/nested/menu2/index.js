import React from 'react';
import { Alert } from 'antd';

function NestRouter() {
  return <div>Menu2</div>;
}

export default function() {
  return <Alert message={<NestRouter />} type="warning" />;
}
