import React from 'react';
import { Card, Alert } from 'antd';
import SplitPane from 'react-split-pane';
import { FormattedHTMLMessage } from 'react-intl';
import I18nProvider from '@/lang';

export default function({ title }) {
  return (
    <I18nProvider scope="components">
      <Card title={title}>
        <Alert message={<FormattedHTMLMessage id="splitspaneTips" />} type="info" showIcon />
        <br />
        <div style={{ position: 'relative', height: 700 }}>
          <SplitPane
            split="vertical"
            defaultSize="50%"
            minSize={50}
            style={{ height: 700, color: '#fff', fontSize: 32, fontWeight: 'bold' }}
            pane1Style={{ backgroundColor: 'red', opacity: 0.5 }}
          >
            <div style={{ padding: 10 }}>Hello pane 1</div>
            <SplitPane
              split="horizontal"
              defaultSize="50%"
              pane1Style={{ backgroundColor: 'blue', opacity: 0.5 }}
              pane2Style={{ backgroundColor: 'green', opacity: 0.5 }}
            >
              <div style={{ padding: 10 }}>Hello pane 2</div>
              <div style={{ padding: 10 }}>Hello pane 3</div>
            </SplitPane>
          </SplitPane>
        </div>
      </Card>
    </I18nProvider>
  );
}
