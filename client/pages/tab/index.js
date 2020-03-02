import React from 'react';
import { Tabs, Tag } from 'antd';
import DataTable from './components/table';
import { FormattedMessage } from 'react-intl';
import I18nProvider from '@/lang';
import { useState } from 'react';

const { TabPane } = Tabs;
export default function() {
  const [count, setCount] = useState(0);
  const onMounted = () => {
    setCount(count + 1);
  };
  return (
    <I18nProvider scope="article">
      <div className="u-padbox">
        <Tag color="blue" size="large" style={{ padding: 5 }}>
          mounted times：{count}
        </Tag>
      </div>
      <Tabs type="card">
        <TabPane tab={<FormattedMessage id="zh" />} key="1">
          <DataTable type="CN" onMounted={onMounted} />
        </TabPane>
        <TabPane tab={<FormattedMessage id="us" />} key="2">
          <DataTable type="US" onMounted={onMounted} />
        </TabPane>
        <TabPane tab={<FormattedMessage id="jp" />} key="3">
          <DataTable type="JP" onMounted={onMounted} />
        </TabPane>
        <TabPane tab={<FormattedMessage id="eu" />} key="4">
          <DataTable type="EU" onMounted={onMounted} />
        </TabPane>
      </Tabs>
    </I18nProvider>
  );
}
