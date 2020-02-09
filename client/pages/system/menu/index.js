import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import MenuAPI from '@/api/menu';

export default class Menu extends React.Component {
  constructor() {
    super();
    this.state = {
      menus: [],
    };
  }

  componentDidMount() {
    MenuAPI.list().then(data => {
      this.setState({ menus: data });
    });
  }

  renderAction(text, record) {
    return (
      <div>
        <Link to={`/system/menu/edit/${record.id}`}>edit</Link>
      </div>
    );
  }

  render() {
    const { menus } = this.state;
    return (
      <Table dataSource={menus} bordered size="middle">
        <Table.Column title="ID" dataIndex="id" key="id" />
        <Table.Column title="title" dataIndex="title" key="title" />
        <Table.Column title="path" dataIndex="path" key="path" />
        <Table.Column title="icon" dataIndex="icon" key="icon" />
        <Table.Column title="component" dataIndex="component" key="component" />
        <Table.Column title="action" render={this.renderAction} />
      </Table>
    );
  }
}
