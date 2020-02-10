import React from 'react';
import { connect } from 'react-redux';
import { Form, Modal, Input, Select, Button, notification } from 'antd';
import MenuAPI from '@/api/menu';

const { Option } = Select;

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

class MenuEdit extends React.Component {
  constructor() {
    super();
    this.state = { filter: [] };
  }

  // componentDidMount() {
  //   const { id } = this.props.match.params;
  //   MenuAPI.detail(id).then(data => {
  //     this.props.form.setFieldsValue(data);
  //   });
  // }

  handleSearch(value) {
    const { lang, languages } = this.props;
    if (value) {
      const filter = languages
        .filter(item => item.scope === 'route' && item.code.indexOf(value) > -1)
        .map(item => ({ text: item[lang], value: item.code }));
      this.setState({ filter });
    } else {
      this.setState({ filter: [] });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const { onSubmit } = this.props;
    const { getFieldsValue } = this.props.form;
    MenuAPI.update(getFieldsValue())
      .then(() => {
        notification.success({
          message: '修改成功',
        });
        onSubmit && onSubmit(getFieldsValue());
        // this.props.history.goBack();
      })
      .catch(err => {
        console.log('err=>' + err);
      });
  }

  render() {
    const { filter } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { title, visible, onCancel } = this.props;

    const formItems = {
      id: {
        label: 'ID',
        options: { rules: [{ required: true, message: 'Username is required!' }] },
        component: <Input />,
      },
      title: {
        label: 'title',
        options: { rules: [{ required: true, message: 'Username is required!' }] },
        component: (
          <Select showSearch onSearch={this.handleSearch.bind(this)}>
            {filter.map(item => (
              <Option key={item.value}>{item.text}</Option>
            ))}
          </Select>
        ),
      },
      path: {
        label: 'path',
        options: { rules: [{ required: true, message: 'Username is required!' }] },
        component: <Input />,
      },
      component: {
        label: 'component',
        component: <Input />,
      },
      icon: {
        label: 'icon',
        component: <Input />,
      },
      sort: {
        label: 'sort',
        options: { rules: [{ required: true, message: 'Username is required!' }] },
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

const mapStateToProps = state => {
  return {
    lang: state.system.lang,
    languages: state.system.languages,
  };
};
export default connect(mapStateToProps)(
  Form.create({
    name: 'menuForm',
    mapPropsToFields(props) {
      const { data } = props;
      const defaultValues = {};
      Object.keys(data).forEach(key => {
        defaultValues[key] = Form.createFormField({
          value: data[key],
        });
      });
      return defaultValues;
    },
  })(MenuEdit)
);
