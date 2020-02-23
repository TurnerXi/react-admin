import React from 'react';
import { Modal, Form, Rate, Empty } from 'antd';
import { injectIntl } from 'react-intl';

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

export default injectIntl(({ title, data = {}, intl, onCancel }) => {
  const { formatMessage } = intl;
  return (
    <Modal centered destroyOnClose title={title} visible={true} footer={null} onCancel={onCancel}>
      <Form {...formItemLayout}>
        <Form.Item label={formatMessage({ id: 'type' })}>{data.type}</Form.Item>
        <Form.Item label={formatMessage({ id: 'date' })}>{data.timestamp}</Form.Item>
        <Form.Item label={formatMessage({ id: 'title' })}>{data.title}</Form.Item>
        <Form.Item label={formatMessage({ id: 'status' })}>{data.status}</Form.Item>
        <Form.Item label={formatMessage({ id: 'importance' })}>
          <Rate count={3} value={data.importance} disabled />
        </Form.Item>
        <Form.Item label={formatMessage({ id: 'content' })}>
          <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
        </Form.Item>
      </Form>
    </Modal>
  );
});
