import React from 'react';
import { Form, Input, Button } from 'antd';
import MenuAPI from '@/api/menu';

class MenuEdit extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    MenuAPI.detail(id).then(data => {
      this.props.form.setFieldsValue(data);
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { getFieldsValue } = this.props.form;
    MenuAPI.update(getFieldsValue()).then(data => {
      console.log(data);
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
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
    const formItems = {
      id: {
        label: 'ID',
        options: { rules: [{ required: true, message: 'Username is required!' }] },
        component: <Input />,
      },
      title: {
        label: 'title',
        options: { rules: [{ required: true, message: 'Username is required!' }] },
        component: <Input />,
      },
      path: {
        label: 'path',
        options: { rules: [{ required: true, message: 'Username is required!' }] },
        component: <Input />,
      },
      component: {
        label: 'component',
        options: { rules: [{ required: true, message: 'Username is required!' }] },
        component: <Input />,
      },
      icon: {
        label: 'icon',
        options: { rules: [{ required: true, message: 'Username is required!' }] },
        component: <Input />,
      },
      sort: {
        label: 'sort',
        options: { rules: [{ required: true, message: 'Username is required!' }] },
        component: <Input />,
      },
    };
    return (
      <Form onSubmit={this.onSubmit.bind(this)}>
        {Object.keys(formItems).map(key => {
          const item = formItems[key];
          return (
            <Form.Item label={item.label} {...formItemLayout}>
              {getFieldDecorator(key, item.options)(item.component)}
            </Form.Item>
          );
        })}
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
export default Form.create({ name: 'menuForm' })(MenuEdit);
