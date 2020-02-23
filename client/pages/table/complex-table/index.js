import React, { useEffect, useState } from 'react';
import { Table, Card } from 'antd';
import { FormattedMessage } from 'react-intl';
import update from 'immutability-helper';
import I18nProvider from '@/lang';
import ArticleAPI from '@/api/article';
import ToolBar from './components/ToolBar';
import TableEdit from './components/Edit';
import TableAdd from './components/Add';
import TableView from './components/View';
import PageViews from './components/Pageviews';
import getColumns from './columns';

const defaultColumnOptions = ['id', 'timestamp', 'author', 'reviewer', 'title', 'importance', 'pageviews', 'status'];

function ComplexTable() {
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

  const onSearch = searchData => {
    setPageData({ page: 1, pageSize, total });
    setSearch(searchData);
  };

  const submitAction = result => {
    if (handler === 'ADD') {
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
        handleAction={handleAction}
        defaultColumnOptions={defaultColumnOptions}
        onColumnFilterChange={onColumnFilterChange}
      />
      <Table
        dataSource={data}
        columns={getColumns({ columnFilter, handleAction })}
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
}

export default function({ title }) {
  return (
    <Card title={title}>
      <I18nProvider scope="table">
        <ComplexTable />
      </I18nProvider>
    </Card>
  );
}
