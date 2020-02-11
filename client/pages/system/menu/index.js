import React from 'react';
import { Table, Card, Button } from 'antd';
import MenuAPI from '@/api/menu';
import MenuEdit from './edit';

export default class Menu extends React.Component {
  constructor() {
    super();
    this.state = {
      menus: [],
      handler: '',
      handleData: {},
    };
  }

  handleAction(handler, handleData) {
    this.setState({ handler, handleData });
  }

  resetAction() {
    this.setState({ handler: '', handleData: {} });
  }

  submitAction(data) {
    // const { menus } = this.state;
    // const dateset = [...menus];
    // const idx = dateset.findIndex(item => item.id === data.id);
    // const item = dateset[idx];
    // dateset.splice(idx, 1, {
    //   ...item,
    //   ...data,
    // });
    // this.setState({ menus: dateset });
    this.resetAction();
  }

  componentDidMount() {
    MenuAPI.tree().then(data => {
      this.setState({ menus: data });
    });
  }

  renderAction(text, record) {
    return (
      <div>
        <Button onClick={() => this.handleAction('EDIT', record)}>编辑</Button>
      </div>
    );
  }

  render() {
    const { menus } = this.state;
    return (
      <Card title="菜单列表">
        <Table dataSource={menus} bordered size="middle" pagination={{ pageSize: 100 }}>
          {/* <Table.Column title="ID" dataIndex="id" key="id" /> */}
          <Table.Column title="title" dataIndex="title" key="title" width="20%" />
          <Table.Column title="path" dataIndex="path" key="path" width="20%" />
          <Table.Column title="icon" dataIndex="icon" key="icon" width="10%" />
          <Table.Column title="component" dataIndex="component" key="component" width="20%" />
          <Table.Column title="action" render={this.renderAction.bind(this)} />
        </Table>
        <MenuEdit
          title="编辑菜单"
          visible={this.state.handler === 'EDIT'}
          onCancel={this.resetAction.bind(this)}
          onSubmit={this.submitAction.bind(this)}
          data={this.state.handleData}
        />
      </Card>
    );
  }
}
