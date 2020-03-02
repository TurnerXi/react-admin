import React, { useEffect, useState } from 'react';
import moment from 'moment';
import ArticleAPI from '@/api/article';
import { Button, Table, Card, Rate } from 'antd';
import { FormattedMessage } from 'react-intl';

export default function({ title, history }) {
  const [data, setData] = useState([]);
  const [{ page, limit, total }, setPageData] = useState({
    page: 1,
    limit: 20,
    total: 20,
  });
  useEffect(() => {
    ArticleAPI.list({ page, limit }).then(result => {
      const { data, total, page, limit } = result;
      setData(
        data.map(item => ({
          ...item,
          timestamp: moment(item.timestamp).format('YYYY-MM-DD hh:mm:ss'),
          key: item.id,
        }))
      );
      setPageData({ total, page, limit });
    });
  }, [page, limit]);

  const edit = key => {
    history.push(`/example/edit/${key}`);
  };

  const onChangePage = (page, limit) => {
    setPageData({ page, limit, total });
  };

  const columns = [
    { title: 'id', dataIndex: 'id', width: '5%' },
    { title: 'timestamp', dataIndex: 'timestamp', width: '15%' },
    { title: 'author', dataIndex: 'author', width: '10%' },
    {
      title: 'importance',
      dataIndex: 'importance',
      width: '15%',
      render(text, record) {
        return <Rate value={record.importance} count={record.importance} disabled />;
      },
    },
    {
      title: 'title',
      dataIndex: 'title',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      width: '15%',
      render: (text, record) => (
        <Button type="link" onClick={() => edit(record.key)}>
          <FormattedMessage id="edit" />
        </Button>
      ),
    },
  ];

  return (
    <Card title={title}>
      <Table
        dataSource={data}
        columns={columns}
        pagination={{ current: page, pageSize: limit, total, onChange: onChangePage }}
      />
    </Card>
  );
}
