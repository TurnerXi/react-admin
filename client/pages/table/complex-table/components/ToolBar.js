import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Checkbox, List, Form, Input, Select, Button, Dropdown } from 'antd';

export default Form.create({
  name: 'toolBar',
  mapPropsToFields(props) {
    const { search } = props;
    const defaultValues = {};
    search &&
      Object.keys(search).forEach(key => {
        defaultValues[key] = Form.createFormField({
          value: search[key],
        });
      });
    return defaultValues;
  },
})(
  injectIntl(({ onSearch, handleAction, columnFilter, onColumnFilterChange, defaultColumnOptions, form, intl }) => {
    const { formatMessage } = intl;
    const { getFieldDecorator } = form;
    const filters = (
      <Checkbox.Group style={{ width: '100%' }} value={columnFilter} onChange={data => onColumnFilterChange(data)}>
        <List
          style={{ backgroundColor: '#fff' }}
          bordered
          size="small"
          dataSource={defaultColumnOptions}
          renderItem={item => (
            <List.Item>
              <Checkbox key={item} value={item}>
                <FormattedMessage id={item} />
              </Checkbox>
            </List.Item>
          )}
        />
      </Checkbox.Group>
    );
    return (
      <div style={{ marginBottom: 5 }}>
        <Form layout="inline">
          <Form.Item>{getFieldDecorator('title')(<Input placeholder={formatMessage({ id: 'title' })} />)}</Form.Item>
          <Form.Item>
            {getFieldDecorator('importance')(
              <Select style={{ width: 120 }} placeholder={formatMessage({ id: 'importance' })}>
                <Select.Option value="1">1</Select.Option>
                <Select.Option value="2">2</Select.Option>
                <Select.Option value="3">3</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('status')(
              <Select style={{ width: 120 }} placeholder={formatMessage({ id: 'status' })}>
                <Select.Option value="published">published</Select.Option>
                <Select.Option value="draft">draft</Select.Option>
                <Select.Option value="deleted">deleted</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            <Button icon="search" type="primary" onClick={() => onSearch(form.getFieldsValue())}>
              <span>{formatMessage({ id: 'search' })}</span>
            </Button>
          </Form.Item>
          <Form.Item>
            <Button icon="plus" type="primary" onClick={() => handleAction('ADD')}>
              <span>
                <FormattedMessage id="add" />
              </span>
            </Button>
          </Form.Item>
          <Form.Item>
            <Dropdown trigger={['click']} overlay={filters} placement="bottomLeft">
              <Button icon="setting" type="primary" />
            </Dropdown>
          </Form.Item>
        </Form>
      </div>
    );
  })
);
