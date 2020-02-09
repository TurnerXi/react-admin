import React, { Component } from 'react';
import { Card, Form, Input, Button, notification } from 'antd';
import LangAPI from '@/api/lang';

class LangEdit extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    const { setFieldsValue } = this.props.form;
    LangAPI.get(id).then(data => {
      setFieldsValue(data);
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { getFieldsValue } = this.props.form;
    LangAPI.update(getFieldsValue())
      .then(() => {
        notification.success({
          message: '修改成功',
        });
        this.props.history.goBack();
      })
      .catch(err => {
        console.log('err=>' + err);
      });
  }

  render() {
    const { Item: FormItem } = Form;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Card title="editLang">
          <Form onSubmit={this.onSubmit.bind(this)}>
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
            <FormItem>
              <Button type="primary" htmlType="submit">
                submit
              </Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Form.create({ name: 'langEdit' })(LangEdit);
