import React from 'react';
import { Card } from 'antd';
import FixTable from './components/FixTable';
import UnfixTable from './components/UnfixTable';

export default function({ title }) {
  return (
    <Card title={title}>
      <FixTable />
      <UnfixTable />
    </Card>
  );
}
