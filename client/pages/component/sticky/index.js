import React from 'react';
import { Affix, Switch, Select, TimePicker, Button, Form, Alert } from 'antd';
import moment from 'moment';
import { FormattedHTMLMessage } from 'react-intl';
import I18nProvider from '@/lang';

const { Option } = Select;
const styles = {
  header: {
    backgroundColor: '#40a9ff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: '5px 10px',
    alignItem: 'center',
  },
  container: {
    height: 850,
    overflow: 'auto',
  },
};

export default function({ title }) {
  const ref = React.createRef();
  return (
    <I18nProvider scope="components">
      <div style={styles.container} ref={ref}>
        <br />
        <Alert message={<FormattedHTMLMessage id="stickyTips" />} type="info" showIcon />
        <div style={{ height: 2000 }}>
          <Affix style={{ paddingTop: 10 }} offsetTop={0} target={() => ref.current}>
            <Form layout="inline" style={styles.header}>
              <Form.Item>
                <Switch defaultChecked />
              </Form.Item>
              <Form.Item>
                <Select defaultValue="lucy" style={{ width: 120 }}>
                  <Option value="lucy">Lucy</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <TimePicker defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
              </Form.Item>
              <Form.Item>
                <Button type="primary">Submit</Button>
              </Form.Item>
            </Form>
          </Affix>

          <Affix style={{ paddingTop: 120 }} offsetTop={80} target={() => ref.current}>
            <Button type="primary">Affix Btn</Button>
          </Affix>
        </div>
      </div>
    </I18nProvider>
  );
}
