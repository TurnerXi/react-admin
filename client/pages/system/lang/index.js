import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Table } from 'antd';
import LangAPI from '@/api/lang';

export default class LangList extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

  componentDidMount() {
    LangAPI.list().then(data => {
      this.setState({ data });
    });
  }

  render() {
    const { Column } = Table;
    const { data } = this.state;
    return (
      <div>
        <Card title="国际化字典">
          <Table dataSource={data}>
            <Column title="id" dataIndex="id" key="id" />
            <Column title="code" dataIndex="code" key="code" />
            <Column title="scope" dataIndex="scope" key="scope" />
            <Column title="zh" dataIndex="zh" key="zh" />
            <Column title="en" dataIndex="en" key="en" />
            <Column
              title="action"
              render={(_, record) => {
                return (
                  <div>
                    <Link to={`/system/lang/edit/${record.id}`}>edit</Link>
                  </div>
                );
              }}
            />
          </Table>
        </Card>
      </div>
    );
  }
}
