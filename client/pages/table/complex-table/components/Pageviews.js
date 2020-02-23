import React from 'react';
import { Table, Modal } from 'antd';
import { injectIntl } from 'react-intl';

export default injectIntl(({ title, data, onCancel, intl }) => {
  const { formatMessage } = intl;

  const columns = [
    {
      title: formatMessage({ id: 'channel' }),
      dataIndex: 'channel',
      align: 'center',
      width: '50%',
    },
    { title: formatMessage({ id: 'pageviews' }), dataIndex: 'pageviews', align: 'center', width: '50%' },
  ];

  const dataSource = ['PC', 'mobile', 'ios', 'android'].map(item => ({
    key: item,
    channel: item,
    pageviews: data.pageviews,
  }));

  return (
    <Modal title={title} visible={true} footer={null} onCancel={onCancel}>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </Modal>
  );
});
