import React from 'react';
import { Alert } from 'antd';

function NestRouter() {
  return <div>Menu1-2-2</div>;
}

export default function() {
  return <Alert message={<NestRouter />} type="success" />;
}
