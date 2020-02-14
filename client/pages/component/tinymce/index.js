import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Alert } from 'antd';
import Tinymce from '@/assets/components/Tinymce';
import I18nProvider from '@/lang';
import { FormattedMessage } from 'react-intl';

const initialValue = `
      <p style="text-align: center;">
        <img title="TinyMCE Logo" src="//www.tiny.cloud/images/glyph-tinymce@2x.png"
         alt="TinyMCE Logo" width="110" height="97" />
      </p>

      <h2 style="text-align: center;">Welcome to the TinyMCE editor demo!</h2>

      <h2>Got questions or need help?</h2>

      <ul>
        <li>Our <a href="https://www.tiny.cloud/docs/">documentation</a>
        is a great resource for learning how to configure TinyMCE.</li>
        <li>Have a specific question? Visit the <a href="https://community.tiny.cloud/forum/"
         target="_blank">Community Forum</a>.</li>
        <li>We also offer enterprise grade support as part of
        <a href="https://www.tiny.cloud/pricing">TinyMCE Enterprise</a>.</li>
      </ul>

      <h2>A simple table to play with</h2>

      <table style="text-align: center;">
        <thead>
          <tr>
            <th>Product</th>
            <th>Cost</th>
            <th>Really?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>TinyMCE</td>
            <td>Free</td>
            <td>YES!</td>
          </tr>
          <tr>
            <td>Plupload</td>
            <td>Free</td>
            <td>YES!</td>
          </tr>
        </tbody>
      </table>

      <h2>Found a bug?</h2>

      <p>
        If you think you have found a bug please create an issue on the <a href="https://github.com/tinymce/tinymce/issues">
        GitHub repo</a> to report it to the developers.
      </p>

      <h2>Finally ...</h2>

      <p>
        Don't forget to check out our other product <a href="http://www.plupload.com" target="_blank">Plupload</a>,
         your ultimate upload solution featuring HTML5 upload support.
      </p>
      <p>
        Thanks for supporting TinyMCE! We hope it helps you and your users create great content.
        <br>All the best from the TinyMCE team.
      </p>
    `;

class CustomTinymce extends Component {
  constructor() {
    super();
    this.state = { content: initialValue };
  }
  handleEditorChange = (content, editor) => {
    this.setState({ content });
  };

  render() {
    const { content } = this.state;
    return (
      <I18nProvider scope="components">
        <Card title={this.props.title}>
          <Alert message={<FormattedMessage id="tinymceTips" />} type="info" showIcon />
          <br />
          <Tinymce
            initialValue={content}
            lang={this.props.lang}
            onChange={this.handleEditorChange}
          />
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </Card>
      </I18nProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    lang: state.system.lang,
  };
};
export default connect(mapStateToProps)(CustomTinymce);
