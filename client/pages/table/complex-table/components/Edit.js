import React from 'react';
import { Modal, Form, Select, Rate, Input, DatePicker, notification } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';
import ArticleAPI from '@/api/article';
import { useState } from 'react';

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

export default Form.create({
  name: 'addForm',
  mapPropsToFields(props) {
    const { data } = props;
    const defaultValues = {};
    data &&
      Object.keys(data).forEach(key => {
        defaultValues[key] = Form.createFormField({
          value: key === 'timestamp' ? moment(data[key]) : data[key],
        });
      });
    return defaultValues;
  },
})(
  injectIntl(({ title, data, intl, form, onCancel, onSubmit }) => {
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
          timestamp: result.timestamp.format('YYYY-MM-DD HH:mm'),
        };
        setSubmitting(true);
        ArticleAPI.update(values)
          .then(() => {
            notification.success({
              message: formatMessage({ id: 'editSuccess' }),
            });
            setSubmitting(false);
            onSubmit && onSubmit({ ...data, ...values });
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
        maskClosable={false}
        confirmLoading={submitting}
      >
        <Form {...formItemLayout}>
          <Form.Item style={{ display: 'none' }}>{getFieldDecorator('id')(<Input />)}</Form.Item>
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
