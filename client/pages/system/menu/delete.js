import React, { Component } from 'react';
import { Modal, notification } from 'antd';
import MenuAPI from '@/api/menu';
import { FormattedMessage, injectIntl } from 'react-intl';

class MenuDelete extends Component {
  onSubmit(e) {
    e.preventDefault();
    const { onSubmit, intl, data } = this.props;
    MenuAPI.remove(data.id)
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
        <FormattedMessage id="confirmDeleteByTitle" values={{ title: data.title }} />
      </Modal>
    );
  }
}

export default injectIntl(MenuDelete);
