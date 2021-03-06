import React from 'react';
import { connect } from 'react-redux';
import { Form, Modal, Input, Select, notification, Switch } from 'antd';
import MenuAPI from '@/api/menu';
import { injectIntl } from 'react-intl';

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
    const { onSubmit, intl, form } = this.props;
    form.validateFields((error, values) => {
      if (error) {
        return;
      }
      const data = { ...values, hidden: values.hidden ? 1 : 0 };
      MenuAPI.update(data)
        .then(() => {
          notification.success({
            message: intl.formatMessage({ id: 'editSuccess' }),
          });
          onSubmit && onSubmit(data);
        })
        .catch(err => {
          console.log('err=>' + err);
        });
    });
  }

  render() {
    const { filter } = this.state;
    const { getFieldDecorator } = this.props.form;
    const {
      title,
      onCancel,
      intl: { formatMessage },
    } = this.props;

    const formItems = {
      id: {
        label: formatMessage({ id: 'id' }),
        options: { rules: [{ required: true, message: 'Username is required!' }] },
        component: <Input />,
      },
      title: {
        label: formatMessage({ id: 'title' }),
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
        label: formatMessage({ id: 'routePath' }),
        options: { rules: [{ required: true, message: 'Username is required!' }] },
        component: <Input />,
      },
      component: {
        label: formatMessage({ id: 'component' }),
        component: <Input />,
      },
      icon: {
        label: formatMessage({ id: 'icon' }),
        component: <Input />,
      },
      sort: {
        label: formatMessage({ id: 'sort' }),
        options: { rules: [{ required: true, message: 'Username is required!' }] },
        component: <Input />,
      },
      hidden: {
        label: formatMessage({ id: 'isHidden' }),
        options: {
          valuePropName: 'checked',
        },
        component: <Switch />,
      },
    };

    return (
      <Modal
        okText={formatMessage({ id: 'submit' })}
        title={title}
        visible
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
          value: key === 'hidden' ? !!data[key] : data[key],
        });
      });
      return defaultValues;
    },
  })(injectIntl(MenuEdit))
);
