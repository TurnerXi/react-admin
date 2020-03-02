import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { Table, Rate, Tag, Button } from 'antd';
import { injectIntl } from 'react-intl';
import ArticleAPI from '@/api/article';
import I18nProvider from '@/lang';

const ArticalTable = injectIntl(({ intl, type, onMounted }) => {
  const [data, setData] = useState([]);
  const { formatMessage } = intl;
  const memoizedCallback = useCallback(onMounted, []);
  useEffect(() => {
    memoizedCallback();
    ArticleAPI.list({ page: 1, limit: 20, type }).then(result => {
      const { data } = result;
      setData(
        data.map(item => ({
          ...item,
          timestamp: moment(item.timestamp).format('YYYY-MM-DD hh:mm:ss'),
          key: item.id,
        }))
      );
    });
  }, [type, memoizedCallback]);

  const columns = [
    { title: formatMessage({ id: 'id' }), dataIndex: 'id', width: '5%' },
    { title: formatMessage({ id: 'timestamp' }), dataIndex: 'timestamp', width: '15%' },
    { title: formatMessage({ id: 'author' }), dataIndex: 'author', width: '10%' },
    {
      title: formatMessage({ id: 'importance' }),
      dataIndex: 'importance',
      width: '15%',
      render(text, record) {
        return <Rate value={record.importance} count={record.importance} disabled />;
      },
    },
    {
      title: formatMessage({ id: 'title' }),
      dataIndex: 'title',
      render(text, record) {
        return (
          <span>
            <Button type="link">{record.title}</Button>
            <Tag color="blue">{record.type}</Tag>
          </span>
        );
      },
    },
  ];

  return <Table dataSource={data} columns={columns} pagination={false} />;
});

export default props => {
  return (
    <I18nProvider scope="article">
      <ArticalTable {...props} />
    </I18nProvider>
  );
};
