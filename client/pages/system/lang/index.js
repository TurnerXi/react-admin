import React, { Component } from 'react';
import { Card, Table, Button, Modal } from 'antd';
import { FormattedMessage } from 'react-intl';
import LangAPI from '@/api/lang';
import I18nProvider from '@/lang';
import LangAdd from './add';
import LangEdit from './edit';
import LangDelete from './delete';

export default class LangList extends Component {
  constructor() {
    super();
    this.state = { data: [], handler: '', handleData: null };
  }

  handleAction(handler, handleData) {
    this.setState({ handler, handleData });
  }

  resetAction() {
    this.setState({ handler: '', handleData: null });
  }

  submitAction(newData) {
    const { handler, data } = this.state;
    const dateset = [...data];
    if (handler === 'EDIT') {
      const idx = dateset.findIndex(item => item.id === newData.id);
      const item = dateset[idx];
      dateset.splice(idx, 1, {
        ...item,
        ...newData,
      });
    } else if (handler === 'ADD') {
      dateset.unshift({ ...newData, id: +new Date() + Math.random() });
    } else if (handler === 'DELETE') {
      const idx = dateset.findIndex(item => item.id === newData.id);
      dateset.splice(idx, 1);
    }
    this.setState({ data: dateset });
    this.resetAction();
  }

  componentDidMount() {
    LangAPI.list().then(data => {
      this.setState({ data });
    });
  }

  onChange(pagination, filters) {
    LangAPI.list({
      ...filters,
    }).then(data => {
      this.setState({ data });
    });
  }

  toolBar() {
    return (
      <div>
        <Button icon="plus" type="primary" onClick={() => this.handleAction('ADD')}>
          <span>
            <FormattedMessage id="add" />
          </span>
        </Button>
      </div>
    );
  }

  render() {
    const { data } = this.state;
    const scopeFilter = Array.from(new Set(data.map(item => item.scope))).map(item => ({
      text: item,
      value: item,
    }));
    const columns = [
      {
        title: <FormattedMessage id="code" />,
        dataIndex: 'code',
        key: 'code',
        width: '15%',
      },
      {
        title: <FormattedMessage id="scope" />,
        dataIndex: 'scope',
        key: 'scope',
        width: '12%',
        filters: scopeFilter,
      },
      {
        title: <FormattedMessage id="zh" />,
        dataIndex: 'zh',
        key: 'zh',
        width: '30%',
        ellipsis: true,
      },
      {
        title: <FormattedMessage id="en" />,
        dataIndex: 'en',
        key: 'en',
        width: '30%',
        ellipsis: true,
      },
      {
        title: <FormattedMessage id="action" />,
        width: '13%',
        align: 'center',
        render: (_, record) => {
          return (
            <div>
              <Button onClick={() => this.handleAction('EDIT', record)}>
                <FormattedMessage id="edit" />
              </Button>
              <Button type="error" onClick={() => this.handleAction('DELETE', record)}>
                <FormattedMessage id="delete" />
              </Button>
            </div>
          );
        },
      },
    ];
    return (
      <I18nProvider scope="lang">
        <Card title={this.props.title}>
          <Table
            dataSource={data}
            columns={columns}
            rowKey={record => record.id}
            title={this.toolBar.bind(this)}
            onChange={this.onChange.bind(this)}
          />
          {this.state.handler === 'EDIT' && (
            <LangEdit
              title={<FormattedMessage id="edit" />}
              onCancel={this.resetAction.bind(this)}
              onSubmit={this.submitAction.bind(this)}
              data={this.state.handleData}
            />
          )}
          {this.state.handler === 'ADD' && (
            <LangAdd
              title={<FormattedMessage id="add" />}
              onCancel={this.resetAction.bind(this)}
              onSubmit={this.submitAction.bind(this)}
            />
          )}
          {this.state.handler === 'DELETE' && (
            <LangDelete
              title={<FormattedMessage id="delete" />}
              onCancel={this.resetAction.bind(this)}
              onSubmit={this.submitAction.bind(this)}
              data={this.state.handleData}
            />
          )}
        </Card>
      </I18nProvider>
    );
  }
}
