import React, { Component } from 'react';
import { Form, Modal, Input, notification } from 'antd';
import LangAPI from '@/api/lang';

class LangEdit extends Component {
  onSubmit(e) {
    e.preventDefault();
    const { onSubmit } = this.props;
    const { getFieldsValue } = this.props.form;
    LangAPI.update(getFieldsValue())
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
    const { Item: FormItem } = Form;
    const { getFieldDecorator } = this.props.form;
    const { title, visible, onCancel } = this.props;
    return (
      <Modal
        okText="submit"
        title={title}
        visible={visible}
        onCancel={onCancel}
        onOk={this.onSubmit.bind(this)}
      >
        <Form>
          <FormItem label="code">
            {getFieldDecorator('code', {
              rules: [{ required: true, message: 'codeCannotBeNull' }],
            })(<Input />)}
          </FormItem>
          <FormItem label="scope">
            {getFieldDecorator('scope', {
              rules: [{ required: true, message: 'codeCannotBeNull' }],
            })(<Input />)}
          </FormItem>
          <FormItem label="zh">
            {getFieldDecorator('zh', {
              rules: [{ required: true, message: 'codeCannotBeNull' }],
            })(<Input />)}
          </FormItem>
          <FormItem label="en">
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
})(LangEdit);
