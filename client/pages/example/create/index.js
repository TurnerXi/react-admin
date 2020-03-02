import React from 'react';
import { connect } from 'react-redux';
import { Card, Form, Input, DatePicker, Rate, Row, Col, Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import ArticleAPI from '@/api/article';
import MDInput from '@/assets/components/MDInput';
import Tinymce from '@/assets/components/Tinymce';
import I18nProvider from '@/lang';
import './index.scss';

const titleItemLayout = {
  labelCol: {
    span: 0,
  },
  wrapperCol: {
    span: 24,
  },
};

const Create = Form.create({
  name: 'createForm',
})(({ title, form, lang }) => {
  const { getFieldDecorator } = form;
  const onSubmit = status => {
    form.validateFields((err, result) => {
      if (err) {
        return;
      }
      ArticleAPI.create({
        ...result,
        timestamp: moment(result.timestamp).format('YYYY-MM-DD HH:mm'),
        status,
      }).then(() => {
        notification.success({
          message: '发布文章成功！',
        });
      });
    });
  };
  return (
    <I18nProvider scope="article">
      <Card title={title}>
        <Form>
          <Form.Item {...titleItemLayout}>
            {getFieldDecorator('title', {
              rules: [{ required: true, message: 'Please input title!' }],
            })(<MDInput label="Title" />)}
          </Form.Item>
          <Row gutter={24}>
            <Col xs={24} sm={8}>
              <Form.Item label={<FormattedMessage id="author" />}>
                {getFieldDecorator('author', {})(<Input style={{ width: 220 }} placeholder="Select User" />)}
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item label={<FormattedMessage id="publishTime" />}>
                {getFieldDecorator('timestamp', {})(<DatePicker showTime />)}
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item label={<FormattedMessage id="importance" />}>
                {getFieldDecorator('importance', {
                  initialValue: 3,
                })(<Rate count={3} />)}
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label={<FormattedMessage id="summary" />}>
            {getFieldDecorator('content_short')(
              <Input className="c-example-input__line" placeholder="Please enter the content" />
            )}
          </Form.Item>
          <Form.Item>{getFieldDecorator('content')(<Tinymce lang={lang} />)}</Form.Item>
          <Form.Item>
            <div className="c-example-form-btn">
              <Button type="primary" onClick={() => onSubmit('published')}>
                <FormattedMessage id="publish" />
              </Button>
              <Button onClick={() => onSubmit('draft')}>
                <FormattedMessage id="draft" />
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </I18nProvider>
  );
});

const mapStateToProps = state => {
  return {
    lang: state.system.lang,
  };
};

export default connect(mapStateToProps)(Create);
