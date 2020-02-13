import React, { Component } from 'react';
import { Form, Modal, Input, notification } from 'antd';
import LangAPI from '@/api/lang';
import { FormattedMessage, injectIntl } from 'react-intl';

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

class LangAdd extends Component {
  onSubmit(e) {
    e.preventDefault();
    const { onSubmit, intl } = this.props;
    const { getFieldsValue } = this.props.form;
    LangAPI.create(getFieldsValue())
      .then(() => {
        notification.success({
          message: intl.formatMessage({ id: 'addSuccess' }),
        });
        onSubmit && onSubmit(getFieldsValue());
      })
      .catch(err => {
        console.log('err=>' + err);
      });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { title, onCancel } = this.props;

    const formItems = {
      code: {
        label: <FormattedMessage id="code" />,
        options: { rules: [{ required: true, message: 'Username is required!' }] },
        component: <Input />,
      },
      scope: {
        label: <FormattedMessage id="scope" />,
        options: { rules: [{ required: true, message: 'Username is required!' }] },
        component: <Input />,
      },
      zh: {
        label: <FormattedMessage id="zh" />,
        component: <Input />,
      },
      en: {
        label: <FormattedMessage id="en" />,
        component: <Input />,
      },
    };
    return (
      <Modal
        visible
        okText={<FormattedMessage id="submit" />}
        title={title}
        onCancel={onCancel}
        onOk={this.onSubmit.bind(this)}
      >
        <Form>
          {Object.keys(formItems).map(key => {
            const item = formItems[key];
            return (
              <Form.Item key={key} label={item.label} {...formItemLayout}>
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
})(injectIntl(LangAdd));
