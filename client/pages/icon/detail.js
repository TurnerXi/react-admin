import React, { Component } from 'react';
import { Modal, Layout, Icon, Form, Checkbox, message } from 'antd';
import { FormattedMessage } from 'react-intl';
import copy from 'copy-to-clipboard';
import ColorPicker from '@/assets/components/ColorPicker';

const { Sider, Content } = Layout;
const { Item: FormItem } = Form;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

const style = {
  blockStyle: { backgroundColor: '#1890ff' },
  iconStyle: { color: '#fff', transform: 'scale(1.4)' },
};
export default class IconDetial extends Component {
  state = {
    twoToneColor: '#1890ff',
    spin: false,
    blockStyle: null,
    iconStyle: null,
    color: '#000000',
  };

  onColorChange = color => {
    this.setState({ color });
  };

  onTwoToneColorChange = twoToneColor => {
    this.setState({ twoToneColor });
  };

  onCancel = () => {
    const { onCancel } = this.props;
    onCancel();
  };

  onMouseEnter = () => {
    this.setState({ blockStyle: style.blockStyle, iconStyle: style.iconStyle });
  };

  onMouseLeave = () => {
    this.setState({ blockStyle: null, iconStyle: null });
  };

  onClick = () => {
    const { type, theme } = this.props;
    const { color, twoToneColor, spin } = this.state;
    let themeText = '';
    let styleText = '';
    let twoToneText = '';
    let spinText = (spin && 'spin') || '';
    if (theme !== 'outlined') {
      themeText = `theme="${theme}"`;
    }
    if (color !== '#000000' && theme !== 'twoTone') {
      styleText = `style={{color:"${color}"}}`;
    }
    if (theme === 'twoTone') {
      twoToneText = `twoTone="${twoToneColor}"`;
    }

    const copyText = `<Icon type="${type}" ${themeText} ${styleText} ${twoToneText} ${spinText} />`.replace(
      /\s+/g,
      ' '
    );
    copy(copyText);

    message.success(
      <span>
        复制成功: <code>{copyText}</code>
      </span>
    );
  };

  render() {
    const { type, theme } = this.props;
    const { color, twoToneColor, spin, blockStyle, iconStyle = {} } = this.state;
    // const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        destroyOnClose
        visible={!!type}
        footer={null}
        title={<FormattedMessage id="detail" />}
        onCancel={this.onCancel}
        width={400}
      >
        <Layout>
          <Sider theme="light" className="c-icon-detail__sider">
            <Form {...formItemLayout}>
              {(theme === 'twoTone' && (
                <FormItem label={<FormattedMessage id="twoToneColor" />} style={{ margin: 0 }}>
                  <ColorPicker color={twoToneColor} onChangeComplete={this.onTwoToneColorChange} />
                </FormItem>
              )) || (
                <FormItem label={<FormattedMessage id="color" />} style={{ margin: 0 }}>
                  <ColorPicker color={color} onChangeComplete={this.onColorChange} />
                </FormItem>
              )}
              <FormItem label={<FormattedMessage id="isSpin" />}>
                <Checkbox onChange={e => this.setState({ spin: e.target.checked })} />
              </FormItem>
            </Form>
          </Sider>
          <Content className="c-icon-detail__content">
            {type && (
              <div
                className="c-icon-detail__wrapper"
                role="presentation"
                style={blockStyle}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                onClick={this.onClick}
              >
                <Icon
                  className="c-icon-detail__icon"
                  type={type}
                  theme={theme}
                  style={{ color, ...iconStyle }}
                  spin={spin}
                  twoToneColor={twoToneColor}
                />
              </div>
            )}
          </Content>
        </Layout>
      </Modal>
    );
  }
}
