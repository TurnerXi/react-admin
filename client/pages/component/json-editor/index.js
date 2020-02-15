import React, { useEffect, useState } from 'react';
import ReactJson from 'react-json-view';
import { Form, Select, Card, Row, Col } from 'antd';
import I18nProvider from '@/lang';
import { FormattedMessage } from 'react-intl';
const { Option } = Select;

const content = {
  string: 'this is a test string',
  integer: 42,
  array: [1, 2, 3, 'test', null],
  float: 3.14159,
  object: {
    'first-child': true,
    'second-child': false,
    'last-child': null,
  },
  string_number: '1234',
  date: '2020-02-15T10:47:56.165Z',
};

const themes = [
  'apathy',
  'ashes',
  'atelierDune',
  'atelierForest',
  'atelierHeath',
  'atelierLakeside',
  'atelierSeaside',
  'bespin',
  'brewer',
  'bright',
  'chalk',
  'codeschool',
  'colors',
  'default',
  'eighties',
  'embers',
  'flat',
  'google',
  'grayscale',
  'greenscreen',
  'harmonic',
  'hopscotch',
  'isotope',
  'marrakesh',
  'mocha',
  'monokai',
  'ocean',
  'paraiso',
  'pop',
  'railscasts',
  'shapeshifter',
  'solarized',
  'summerfruit',
  'tomorrow',
  'tube',
  'twilight',
];

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

function JsonEditorPage({ form, title }) {
  const { getFieldDecorator } = form;
  const [config, setConfig] = useState(null);

  useEffect(() => {
    const value = form.getFieldsValue();
    setConfig(prevConfig => {
      return {
        ...prevConfig,
        ...value,
        onAdd:
          value.enableAdd &&
          function(e) {
            console.log(e);
          },
        onEdit:
          value.enableEdit &&
          function(e) {
            console.log(e);
          },
        onDelete:
          value.enableDelete &&
          function(e) {
            console.log(e);
          },
      };
    });
  }, [form]);

  return (
    <I18nProvider scope="component">
      <Card title={title}>
        <ReactJson src={content} {...config} />
        <div style={{ paddingTop: '20px' }}>
          <Form {...formItemLayout} style={{ paddintTop: 10 }}>
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item label={<FormattedMessage id="theme" />}>
                  {getFieldDecorator('theme', {
                    initialValue: 'monokai',
                  })(
                    <Select>
                      {themes.map(item => (
                        <Option key={item} value={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={<FormattedMessage id="iconStyle" />}>
                  {getFieldDecorator('iconStyle', {
                    initialValue: 'circle',
                  })(
                    <Select>
                      <Option value="circle">circle</Option>
                      <Option value="square">square</Option>
                      <Option value="triangle">triangle</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={<FormattedMessage id="enableEdit" />}>
                  {getFieldDecorator('enableEdit', {
                    initialValue: 1,
                  })(
                    <Select>
                      <Option value={1}>true</Option>
                      <Option value={0}>false</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item label={<FormattedMessage id="enableAdd" />}>
                  {getFieldDecorator('enableAdd', {
                    initialValue: 1,
                  })(
                    <Select>
                      <Option value={1}>true</Option>
                      <Option value={0}>false</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={<FormattedMessage id="enableDelete" />}>
                  {getFieldDecorator('enableDelete', {
                    initialValue: 1,
                  })(
                    <Select>
                      <Option value={1}>true</Option>
                      <Option value={0}>false</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={<FormattedMessage id="enabelClipboard" />}>
                  {getFieldDecorator('enabelClipboard', {
                    initialValue: 1,
                  })(
                    <Select>
                      <Option value={1}>true</Option>
                      <Option value={0}>false</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item label={<FormattedMessage id="displayDataTypes" />}>
                  {getFieldDecorator('displayDataTypes', {
                    initialValue: 1,
                  })(
                    <Select>
                      <Option value={1}>true</Option>
                      <Option value={0}>false</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={<FormattedMessage id="displayObjectSize" />}>
                  {getFieldDecorator('displayObjectSize', {
                    initialValue: 1,
                  })(
                    <Select>
                      <Option value={1}>true</Option>
                      <Option value={0}>false</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={<FormattedMessage id="indentWidth" />}>
                  {getFieldDecorator('indentWidth', {
                    initialValue: 2,
                  })(
                    <Select>
                      <Option value={0}>0</Option>
                      <Option value={2}>2</Option>
                      <Option value={4}>4</Option>
                      <Option value={6}>6</Option>
                      <Option value={8}>8</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item label={<FormattedMessage id="collapsed" />}>
                  {getFieldDecorator('collapsed', {
                    initialValue: 9,
                  })(
                    <Select>
                      <Option value={0}>true</Option>
                      <Option value={9}>false</Option>
                      <Option value={1}>1</Option>
                      <Option value={2}>2</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={<FormattedMessage id="collapseStringsAfterLength" />}>
                  {getFieldDecorator('collapseStringsAfterLength', {
                    initialValue: '',
                  })(
                    <Select>
                      <Option value="">false</Option>
                      <Option value={5}>5</Option>
                      <Option value={10}>10</Option>
                      <Option value={15}>15</Option>
                      <Option value={20}>20</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Card>
    </I18nProvider>
  );
}

export default Form.create({
  name: 'jsonEditorForm',
})(JsonEditorPage);
