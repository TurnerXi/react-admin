import React, { Component } from 'react';
import { Form, Modal, Input, notification } from 'antd';
import LangAPI from '@/api/lang';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class LangAdd extends Component {
  onSubmit(e) {
    e.preventDefault();
    const { onSubmit } = this.props;
    const { getFieldsValue } = this.props.form;
    LangAPI.create(getFieldsValue())
      .then(() => {
        notification.success({
          message: '新增成功',
        });
        onSubmit && onSubmit(getFieldsValue());
      })
      .catch(err => {
        console.log('err=>' + err);
      });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { title, visible, onCancel } = this.props;

    const formItems = {
      code: {
        label: 'code',
        options: { rules: [{ required: true, message: 'Username is required!' }] },
        component: <Input />,
      },
      scope: {
        label: 'scope',
        options: { rules: [{ required: true, message: 'Username is required!' }] },
        component: <Input />,
      },
      zh: {
        label: 'zh',
        component: <Input />,
      },
      en: {
        label: 'en',
        component: <Input />,
      },
    };
    return (
      <Modal
        okText="submit"
        title={title}
        visible={visible}
        onCancel={onCancel}
        onOk={this.onSubmit.bind(this)}
      >
        <Form>
          {Object.keys(formItems).map(key => {
            const item = formItems[key];
            return (
              <Form.Item label={item.label} {...formItemLayout}>
                {getFieldDecorator(key, item.options || {})(item.component)}
              </Form.Item>
            );
          })}
        </Form>
      </Modal>
    );
  }
}

export default Form.create({
  name: 'langAddForm',
})(LangAdd);
