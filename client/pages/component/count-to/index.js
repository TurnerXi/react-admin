import React, { useState } from 'react';
import { InputNumber, Button, Checkbox, Form, Card, Alert, ConfigProvider } from 'antd';
import { FormattedHTMLMessage } from 'react-intl';
import { magenta } from '@ant-design/colors';
import TweenOne from 'rc-tween-one';
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin';
import I18nProvider from '@/lang';

TweenOne.plugins.push(Children);

const styles = {
  ani: {
    fontSize: 56,
    marginBottom: 12,
    padding: 20,
    textAlign: 'center',
    color: magenta.primary,
  },
  form: {
    textAlign: 'center',
  },
};

export default function({ title }) {
  const [formatMoney, setFormatMoney] = useState(true);
  const [number, setNumber] = useState(1000);
  const [floatLength, setFloatLength] = useState(2);
  const [animation, setAnimation] = useState(null);
  const [duration, setDuration] = useState(1000);

  const onStart = () => {
    setAnimation({
      Children: { value: number, floatLength, formatMoney },
      duration,
    });
  };
  return (
    <I18nProvider scope="components">
      <Card title={title}>
        <Alert message={<FormattedHTMLMessage id="countToTips" />} type="info" showIcon />
        <div style={styles.ani}>
          <span>¥ </span>
          <TweenOne animation={animation} style={{ display: 'inline-block' }}>
            0
          </TweenOne>
          <span> rmb</span>
        </div>
        <Form layout="inline" style={styles.form}>
          <Form.Item label="number">
            <InputNumber defaultValue={number} onChange={value => setNumber(value)} />
          </Form.Item>
          <Form.Item label="floatLength">
            <InputNumber defaultValue={floatLength} onChange={value => setFloatLength(value)} />
          </Form.Item>
          <Form.Item label="duration">
            <InputNumber defaultValue={duration} onChange={value => setDuration(value)} />
          </Form.Item>
          <Form.Item label="formatMoney">
            <Checkbox checked onChange={e => setFormatMoney(e.target.checked)} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={onStart}>
              Start
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </I18nProvider>
  );
}
