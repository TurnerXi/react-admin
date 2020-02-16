import React, { Component } from 'react';
import { Modal, notification } from 'antd';
import LangAPI from '@/api/lang';
import { FormattedMessage, injectIntl } from 'react-intl';

class LangDelete extends Component {
  onSubmit(e) {
    e.preventDefault();
    const { onSubmit, intl, data } = this.props;
    LangAPI.remove(data.id)
      .then(() => {
        notification.success({
          message: intl.formatMessage({ id: 'deleteSuccess' }),
        });
        onSubmit && onSubmit(data);
      })
      .catch(err => {
        console.log('err=>' + err);
      });
  }

  render() {
    const { title, onCancel, data } = this.props;
    return (
      <Modal
        visible
        okText={<FormattedMessage id="submit" />}
        title={title}
        onCancel={onCancel}
        onOk={this.onSubmit.bind(this)}
      >
        <FormattedMessage id="confirmDeleteByCode" values={{ code: data.code }} />
      </Modal>
    );
  }
}

export default injectIntl(LangDelete);
