import React, { useEffect, useState } from 'react';
import { Table, Button, Tag, Rate, Row, Col, Card, Form, Input, Select, Dropdown, Checkbox, List } from 'antd';
import { injectIntl, FormattedMessage } from 'react-intl';
import update from 'immutability-helper';
import moment from 'moment';
import I18nProvider from '@/lang';
import ArticleAPI from '@/api/article';
import TableEdit from './edit';
import TableAdd from './add';
import TableView from './view';
import PageViews from './pageviews';

const defaultColumnOptions = ['id', 'timestamp', 'author', 'reviewer', 'title', 'importance', 'pageviews', 'status'];

const ToolBar = Form.create({
  name: 'toolBar',
  mapPropsToFields(props) {
    const { search } = props;
    const defaultValues = {};
    search &&
      Object.keys(search).forEach(key => {
        defaultValues[key] = Form.createFormField({
          value: search[key],
        });
      });
    return defaultValues;
  },
})(
  injectIntl(({ onSearch, handleAction, columnFilter, onColumnFilterChange, form, intl }) => {
    const { formatMessage } = intl;
    const { getFieldDecorator } = form;
    const filters = (
      <Checkbox.Group style={{ width: '100%' }} value={columnFilter} onChange={data => onColumnFilterChange(data)}>
        <List
          style={{ backgroundColor: '#fff' }}
          bordered
          size="small"
          dataSource={defaultColumnOptions}
          renderItem={item => (
            <List.Item>
              <Checkbox key={item} value={item}>
                <FormattedMessage id={item} />
              </Checkbox>
            </List.Item>
          )}
        />
      </Checkbox.Group>
    );
    return (
      <div style={{ marginBottom: 5 }}>
        <Form layout="inline">
          <Form.Item>{getFieldDecorator('title')(<Input placeholder={formatMessage({ id: 'title' })} />)}</Form.Item>
          <Form.Item>
            {getFieldDecorator('importance')(
              <Select style={{ width: 120 }} placeholder={formatMessage({ id: 'importance' })}>
                <Select.Option value="1">1</Select.Option>
                <Select.Option value="2">2</Select.Option>
                <Select.Option value="3">3</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('status')(
              <Select style={{ width: 120 }} placeholder={formatMessage({ id: 'status' })}>
                <Select.Option value="published">published</Select.Option>
                <Select.Option value="draft">draft</Select.Option>
                <Select.Option value="deleted">deleted</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            <Button icon="search" type="primary" onClick={() => onSearch(form.getFieldsValue())}>
              <span>{formatMessage({ id: 'search' })}</span>
            </Button>
          </Form.Item>
          <Form.Item>
            <Button icon="plus" type="primary" onClick={() => handleAction('ADD')}>
              <span>
                <FormattedMessage id="add" />
              </span>
            </Button>
          </Form.Item>
          <Form.Item>
            <Dropdown trigger="click" overlay={filters} placement="bottomLeft">
              <Button icon="setting" type="primary" />
            </Dropdown>
          </Form.Item>
        </Form>
      </div>
    );
  })
);

const ComplexTable = injectIntl(({ intl }) => {
  const [loading, setLoading] = useState(false);
  const [columnFilter, setColumnFilter] = useState(defaultColumnOptions.filter(item => item !== 'reviewer'));
  const [data, setData] = useState([]);
  const [{ page, pageSize, total }, setPageData] = useState({ page: 1, pageSize: 20, total: 20 });
  const [search, setSearch] = useState({});
  const [handler, setHandler] = useState('');
  const [handleData, setHandleData] = useState(null);

  useEffect(() => {
    setLoading(true);
    ArticleAPI.list({ ...search, page, limit: pageSize })
      .then(result => {
        setLoading(false);
        const { data, total, page, limit } = result;
        setData(data.map(item => ({ ...item, key: item.id })));
        setPageData({ total, page, pageSize: limit });
      })
      .catch(() => {
        setLoading(false);
      });
  }, [page, pageSize, search]);

  const { formatMessage } = intl;
  let columns = [
    {
      title: formatMessage({ id: 'id' }),
      dataIndex: 'id',
      align: 'center',
      width: '5%',
    },
    {
      title: formatMessage({ id: 'date' }),
      dataIndex: 'timestamp',
      align: 'center',
      width: '15%',
      render(text, record) {
        return moment(record.timestamp).format('YYYY-MM-DD hh:mm');
      },
    },
    {
      title: formatMessage({ id: 'title' }),
      dataIndex: 'title',
      render(text, record) {
        return (
          <>
            <Button type="link" onClick={() => handleAction('VIEW', record)}>
              {record.title}
            </Button>
            <Tag color="blue">{record.type}</Tag>
          </>
        );
      },
    },
    {
      title: formatMessage({ id: 'author' }),
      dataIndex: 'author',
      align: 'center',
      width: '8%',
    },
    {
      title: formatMessage({ id: 'reviewer' }),
      dataIndex: 'reviewer',
      align: 'center',
      width: '8%',
      render(text, record) {
        return <span style={{ color: 'red' }}>{record.reviewer}</span>;
      },
    },
    {
      title: formatMessage({ id: 'importance' }),
      dataIndex: 'importance',
      width: '8%',
      render(text, record) {
        return <Rate value={record.importance} count={record.importance} disabled />;
      },
    },
    {
      title: formatMessage({ id: 'pageviews' }),
      dataIndex: 'pageviews',
      align: 'center',
      width: '8%',
      render(text, record) {
        return (
          <Button type="link" onClick={() => handleAction('PAGEVIEWS', record)}>
            {record.pageviews}
          </Button>
        );
      },
    },
    {
      title: formatMessage({ id: 'status' }),
      dataIndex: 'status',
      align: 'center',
      width: '8%',
      render(text, record) {
        let color = 'blue';
        if (record.status === 'deleted') {
          color = 'red';
        } else if (record.status === 'published') {
          color = 'green';
        } else if (record.status === 'draft') {
          color = '';
        }
        return <Tag color={color}>{record.status}</Tag>;
      },
    },
  ];

  columns = columns.filter(item => columnFilter.indexOf(item.dataIndex) > -1);

  columns.push({
    title: formatMessage({ id: 'action' }),
    dataIndex: 'action',
    align: 'center',
    render(text, record) {
      return (
        <Row gutter={8}>
          <Col span={8}>
            <Button type="primary" onClick={() => handleAction('EDIT', record)}>
              {formatMessage({ id: 'edit' })}
            </Button>
          </Col>
          <Col span={8}>
            <Button type={record.status !== 'published' ? 'primary' : ''} onClick={() => handleAction('PUBLISH', record)}>
              {formatMessage({ id: record.status !== 'published' ? 'publish' : 'draft' })}
            </Button>
          </Col>
          <Col span={8}>
            <Button type={record.status !== 'deleted' ? 'danger' : ''} onClick={() => handleAction('DELETE', record)}>
              {formatMessage({ id: record.status !== 'deleted' ? 'delete' : 'draft' })}
            </Button>
          </Col>
        </Row>
      );
    },
  });

  const handleAction = (type, data) => {
    setHandler(type);
    setHandleData(data || null);
    if (type === 'PUBLISH') {
      data.status = data.status === 'published' ? 'draft' : 'published';
      submitAction(data);
    } else if (type === 'DELETE') {
      data.status = data.status === 'deleted' ? 'draft' : 'deleted';
      submitAction(data);
    }
  };

  const resetAction = e => {
    setHandler('');
    setHandleData(null);
  };

  let temp = 0;

  const onSearch = searchData => {
    setPageData({ page: 1, pageSize, total });
    setSearch(searchData);
  };

  const submitAction = result => {
    if (handler === 'ADD') {
      result.key = `temp_${temp++}`;
      setData(
        update(data, {
          $splice: [[0, 0, result]],
        })
      );
    } else if (handler === 'EDIT' || handler === 'PUBLISH' || handler === 'DELETE') {
      const idx = data.indexOf(handleData);
      setData(
        update(data, {
          $splice: [[idx, 1, result]],
        })
      );
    }
    resetAction();
  };

  const onColumnFilterChange = filters => {
    setColumnFilter(filters);
  };

  return (
    <>
      <ToolBar
        search={search}
        onSearch={onSearch}
        columnFilter={columnFilter}
        onColumnFilterChange={onColumnFilterChange}
        handleAction={handleAction}
      />
      <Table
        dataSource={data}
        columns={columns}
        loading={loading}
        pagination={{
          current: page,
          pageSize,
          total,
          onChange(page, pageSize) {
            setPageData({ page, pageSize, total });
          },
        }}
      />
      {handler === 'ADD' && (
        <TableAdd title={<FormattedMessage id="add" />} onCancel={resetAction} onSubmit={submitAction} />
      )}
      {handler === 'EDIT' && (
        <TableEdit title={<FormattedMessage id="edit" />} onCancel={resetAction} onSubmit={submitAction} data={handleData} />
      )}
      {handler === 'VIEW' && <TableView title={<FormattedMessage id="view" />} onCancel={resetAction} data={handleData} />}
      {handler === 'PAGEVIEWS' && (
        <PageViews title={<FormattedMessage id="pageviews" />} onCancel={resetAction} data={handleData} />
      )}
    </>
  );
});

export default function({ title }) {
  return (
    <Card title={title}>
      <I18nProvider scope="table">
        <ComplexTable />
      </I18nProvider>
    </Card>
  );
}
