import React from 'react';
import { Table, Card, Button, Icon } from 'antd';
import MenuAPI from '@/api/menu';
import MenuEdit from './edit';
import I18nProvider from '@/lang';
import { FormattedMessage } from 'react-intl';

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
      <I18nProvider scope="route">
        <Card title={<FormattedMessage id="menuTitle" />}>
          <Table
            dataSource={menus}
            bordered
            size="middle"
            pagination={{ pageSize: 100 }}
            rowKey="id"
          >
            <Table.Column
              title={
                <div style={{ textAlign: 'center' }}>
                  <FormattedMessage id="name" />
                </div>
              }
              key="title"
              width="20%"
              render={(text, record) => <FormattedMessage id={record.title} />}
            />
            <Table.Column
              align="center"
              title={<FormattedMessage id="icon" />}
              key="icon"
              width="10%"
              render={(text, record) => {
                if (record.icon) {
                  return <Icon type={record.icon} />;
                }
              }}
            />
            <Table.Column title={<FormattedMessage id="routePath" />} dataIndex="path" key="path" />
            <Table.Column
              align="center"
              width="20%"
              title={<FormattedMessage id="action" />}
              render={this.renderAction.bind(this)}
            />
          </Table>
          <MenuEdit
            title={<FormattedMessage id="menuEdit" />}
            visible={this.state.handler === 'EDIT'}
            onCancel={this.resetAction.bind(this)}
            onSubmit={this.submitAction.bind(this)}
            data={this.state.handleData}
          />
        </Card>
      </I18nProvider>
    );
  }
}
