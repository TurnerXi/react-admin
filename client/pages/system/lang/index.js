import React, { Component } from 'react';
import { Card, Table, Button } from 'antd';
import LangAPI from '@/api/lang';
import LangAdd from './add';
import LangEdit from './edit';

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
      dateset.unshift(newData);
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
          add
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
      { title: 'id', dataIndex: 'id', key: 'id' },
      { title: 'code', dataIndex: 'code', key: 'code' },
      {
        title: 'scope',
        dataIndex: 'scope',
        key: 'scope',
        filters: scopeFilter,
      },
      { title: 'zh', dataIndex: 'zh', key: 'zh' },
      { title: 'en', dataIndex: 'en', key: 'en' },
      {
        title: 'action',
        render: (_, record) => {
          return (
            <div>
              <Button onClick={() => this.handleAction('EDIT', record)}>edit</Button>
            </div>
          );
        },
      },
    ];
    return (
      <div>
        <Card title="国际化字典">
          <Table
            dataSource={data}
            columns={columns}
            rowKey={record => record.id}
            title={this.toolBar.bind(this)}
            onChange={this.onChange.bind(this)}
          />
          <LangEdit
            title="编辑字典"
            visible={this.state.handler === 'EDIT'}
            onCancel={this.resetAction.bind(this)}
            onSubmit={this.submitAction.bind(this)}
            data={this.state.handleData}
          />
          <LangAdd
            title="新增字典"
            visible={this.state.handler === 'ADD'}
            onCancel={this.resetAction.bind(this)}
            onSubmit={this.submitAction.bind(this)}
          />
        </Card>
      </div>
    );
  }
}
