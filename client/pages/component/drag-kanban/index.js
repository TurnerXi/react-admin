import React, { useState } from 'react';
import { Card, Alert } from 'antd';
import { blue, yellow, green } from '@ant-design/colors';
import I18nProvider from '@/lang';
import DragKanban from '@/assets/components/DragKanban';
import { FormattedHTMLMessage } from 'react-intl';

export default function({ title }) {
  const configs = [
    { title: 'Todo', color: blue.primary },
    { title: 'Working', color: yellow.primary },
    { title: 'Done', color: green.primary },
  ];

  const [datas, setDatas] = useState([new Array(10).fill('').map((item, idx) => `Mission ${idx}`)]);

  const onChange = data => {
    setDatas(data);
  };
  return (
    <I18nProvider scope="components">
      <Card title={title}>
        <Alert message={<FormattedHTMLMessage id="dragKanbanTips" />} type="info" showIcon />
        <br />
        <DragKanban configs={configs} datas={datas} onChange={onChange} />
      </Card>
    </I18nProvider>
  );
}
