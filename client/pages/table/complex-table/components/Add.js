import React, { useState } from 'react';
import { Modal, Form, Select, Rate, Input, DatePicker, notification } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';
import ArticleAPI from '@/api/article';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

export default Form.create({ name: 'addForm' })(
  injectIntl(({ title, intl, form, onCancel, onSubmit }) => {
    const { formatMessage } = intl;
    const { getFieldDecorator } = form;
    const [submitting, setSubmitting] = useState(false);
    const beforeSubmit = () => {
      form.validateFields((err, result) => {
        if (err) {
          return;
        }
        const values = {
          ...result,
          author: 'admin',
          pageviews: 0,
          timestamp: result.timestamp.format('YYYY-MM-DD HH:mm'),
        };
        setSubmitting(true);
        ArticleAPI.create(values)
          .then(id => {
            notification.success({
              message: formatMessage({ id: 'addSuccess' }),
            });
            setSubmitting(false);
            onSubmit && onSubmit({ ...values, key: id, id });
          })
          .catch(e => {
            setSubmitting(false);
            console.error(e);
          });
      });
    };
    return (
      <Modal
        centered
        destroyOnClose
        title={title}
        visible={true}
        onOk={beforeSubmit}
        onCancel={onCancel}
        okText={
          <span>
            <FormattedMessage id="submit" />
          </span>
        }
        confirmLoading={submitting}
        maskClosable={false}
      >
        <Form {...formItemLayout}>
          <Form.Item label={formatMessage({ id: 'type' })}>
            {getFieldDecorator('type', {
              rules: [{ required: true, message: 'Please select type!' }],
            })(
              <Select style={{ width: 200 }} placeholder="Please select type!">
                <Select.Option value="EU">EU</Select.Option>
                <Select.Option value="US">US</Select.Option>
                <Select.Option value="JP">JP</Select.Option>
                <Select.Option value="CN">CN</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label={formatMessage({ id: 'date' })}>
            {getFieldDecorator('timestamp', {
              rules: [{ required: true, message: 'Please input timestamp!' }],
            })(<DatePicker showTime format="YYYY-MM-DD HH:mm" />)}
          </Form.Item>
          <Form.Item label={formatMessage({ id: 'title' })}>
            {getFieldDecorator('title', {
              rules: [{ required: true, message: 'Please input title!' }],
            })(<Input placeholder="Please input title!" />)}
          </Form.Item>
          <Form.Item label={formatMessage({ id: 'status' })}>
            {getFieldDecorator('status', {
              rules: [{ required: true, message: 'Please select status!' }],
            })(
              <Select style={{ width: 200 }} placeholder="Please select status">
                <Select.Option value="published">published</Select.Option>
                <Select.Option value="draft">draft</Select.Option>
                <Select.Option value="deleted">deleted</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label={formatMessage({ id: 'importance' })}>
            {getFieldDecorator('importance', {
              initialValue: 3,
            })(<Rate count={3} />)}
          </Form.Item>
          <Form.Item label={formatMessage({ id: 'content' })}>
            {getFieldDecorator('content', {})(<Input.TextArea rows={4} placeholder="Please input content" />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  })
);
