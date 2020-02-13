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

class LangEdit extends Component {
  onSubmit(e) {
    e.preventDefault();
    const { onSubmit, intl } = this.props;
    const { getFieldsValue } = this.props.form;
    LangAPI.update(getFieldsValue())
      .then(() => {
        notification.success({
          message: intl.formatMessage({ id: 'editSuccess' }),
        });
        onSubmit && onSubmit(getFieldsValue());
      })
      .catch(err => {
        console.log('err=>' + err);
      });
  }

  render() {
    const { Item: FormItem } = Form;
    const { getFieldDecorator } = this.props.form;
    const { title, onCancel } = this.props;
    return (
      <Modal
        visible
        okText={<FormattedMessage id="submit" />}
        title={title}
        onCancel={onCancel}
        onOk={this.onSubmit.bind(this)}
      >
        <Form {...formItemLayout}>
          <FormItem label={<FormattedMessage id="id" />} style={{ display: 'none' }}>
            {getFieldDecorator('id', {})(<Input />)}
          </FormItem>
          <FormItem label={<FormattedMessage id="code" />}>
            {getFieldDecorator('code', {
              rules: [{ required: true, message: 'codeCannotBeNull' }],
            })(<Input />)}
          </FormItem>
          <FormItem label={<FormattedMessage id="scope" />}>
            {getFieldDecorator('scope', {
              rules: [{ required: true, message: 'codeCannotBeNull' }],
            })(<Input />)}
          </FormItem>
          <FormItem label={<FormattedMessage id="zh" />}>
            {getFieldDecorator('zh', {
              rules: [{ required: true, message: 'codeCannotBeNull' }],
            })(<Input />)}
          </FormItem>
          <FormItem label={<FormattedMessage id="en" />}>
            {getFieldDecorator('en', {
              rules: [{ required: true, message: 'codeCannotBeNull' }],
            })(<Input />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({
  name: 'langEditForm',
  mapPropsToFields(props) {
    const { data } = props;
    const defaultValues = {};
    data &&
      Object.keys(data).forEach(key => {
        defaultValues[key] = Form.createFormField({
          value: data[key],
        });
      });
    return defaultValues;
  },
})(injectIntl(LangEdit));
