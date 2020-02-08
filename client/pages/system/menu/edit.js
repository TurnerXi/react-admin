import React from 'react';
import { Form, Input } from 'antd';
import { detail } from '@/api/menu';

class MenuEdit extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    detail(id).then(data => {
      this.props.form.setFieldsValue(data);
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <Form.Item label="ID">
          {getFieldDecorator('id', {
            rules: [{ required: true, message: 'Username is required!' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="title">
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Username is required!' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="path">
          {getFieldDecorator('path', {
            rules: [{ required: true, message: 'Username is required!' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="component">
          {getFieldDecorator('component', {
            rules: [{ required: true, message: 'Username is required!' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="icon">
          {getFieldDecorator('icon', {
            rules: [{ required: true, message: 'Username is required!' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="sort">
          {getFieldDecorator('sort', {
            rules: [{ required: true, message: 'Username is required!' }],
          })(<Input />)}
        </Form.Item>
      </Form>
    );
  }
}
export default Form.create({ name: 'menuForm' })(MenuEdit);
