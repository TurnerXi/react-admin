import React from 'react';
import { Button, Tag, Rate, Row, Col } from 'antd';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';

function Title({ record, handleAction }) {
  return (
    <>
      <Button type="link" onClick={() => handleAction('VIEW', record)}>
        {record.title}
      </Button>
      <Tag color="blue">{record.type}</Tag>
    </>
  );
}

function Status({ record }) {
  let color = 'blue';
  if (record.status === 'deleted') {
    color = 'red';
  } else if (record.status === 'published') {
    color = 'green';
  } else if (record.status === 'draft') {
    color = '';
  }
  return <Tag color={color}>{record.status}</Tag>;
}

function Action({ record, handleAction }) {
  return (
    <Row gutter={8}>
      <Col span={8}>
        <Button type="primary" onClick={() => handleAction('EDIT', record)}>
          <FormattedMessage id="edit" />
        </Button>
      </Col>
      <Col span={8}>
        <Button type={record.status !== 'published' ? 'primary' : ''} onClick={() => handleAction('PUBLISH', record)}>
          <FormattedMessage id={record.status !== 'published' ? 'publish' : 'draft'} />
        </Button>
      </Col>
      <Col span={8}>
        <Button type={record.status !== 'deleted' ? 'danger' : ''} onClick={() => handleAction('DELETE', record)}>
          <FormattedMessage id={record.status !== 'deleted' ? 'delete' : 'draft'} />
        </Button>
      </Col>
    </Row>
  );
}

export default function getColumns({ columnFilter = [], handleAction }) {
  let columns = [
    {
      title: <FormattedMessage id="id" />,
      dataIndex: 'id',
      align: 'center',
      width: '5%',
    },
    {
      title: <FormattedMessage id="date" />,
      dataIndex: 'timestamp',
      align: 'center',
      width: '15%',
      render(text, record) {
        return moment(record.timestamp).format('YYYY-MM-DD hh:mm');
      },
    },
    {
      title: <FormattedMessage id="title" />,
      dataIndex: 'title',
      render(text, record) {
        return <Title record={record} handleAction={handleAction} />;
      },
    },
    {
      title: <FormattedMessage id="author" />,
      dataIndex: 'author',
      align: 'center',
      width: '8%',
    },
    {
      title: <FormattedMessage id="reviewer" />,
      dataIndex: 'reviewer',
      align: 'center',
      width: '8%',
      render: (text, record) => <span style={{ color: 'red' }}>{record.reviewer}</span>,
    },
    {
      title: <FormattedMessage id="importance" />,
      dataIndex: 'importance',
      width: '8%',
      render: (text, record) => <Rate value={record.importance} count={record.importance} disabled />,
    },
    {
      title: <FormattedMessage id="pageviews" />,
      dataIndex: 'pageviews',
      align: 'center',
      width: '8%',
      render: (text, record) => (
        <Button type="link" onClick={() => handleAction('PAGEVIEWS', record)}>
          {record.pageviews}
        </Button>
      ),
    },
    {
      title: <FormattedMessage id="status" />,
      dataIndex: 'status',
      align: 'center',
      width: '8%',
      render(text, record) {
        return <Status record={record} />;
      },
    },
  ];

  columns = columns.filter(item => columnFilter.indexOf(item.dataIndex) > -1);

  columns.push({
    title: <FormattedMessage id="action" />,
    dataIndex: 'action',
    align: 'center',
    render(text, record) {
      return <Action record={record} handleAction={handleAction} />;
    },
  });

  return columns;
}
