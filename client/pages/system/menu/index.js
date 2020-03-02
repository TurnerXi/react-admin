import React from 'react';
import { Table, Card, Button, Icon } from 'antd';
import { FormattedMessage } from 'react-intl';
import MenuAPI from '@/api/menu';
import I18nProvider from '@/lang';
import MenuEdit from './edit';
import MenuDelete from './delete';

const styles = {
  btn: {
    marginRight: 8,
  },
};

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
    this.resetAction();
    MenuAPI.tree().then(data => {
      this.setState({ menus: data });
    });
  }

  componentDidMount() {
    MenuAPI.tree().then(data => {
      this.setState({ menus: data });
    });
  }

  renderAction(text, record) {
    return (
      <div>
        <Button type="primary" style={styles.btn} onClick={() => this.handleAction('EDIT', record)}>
          <FormattedMessage id="edit" />
        </Button>
        <Button type="danger" style={styles.btn} onClick={() => this.handleAction('DELETE', record)}>
          <FormattedMessage id="delete" />
        </Button>
      </div>
    );
  }

  render() {
    const { menus } = this.state;
    return (
      <I18nProvider scope="route">
        <Card title={<FormattedMessage id="menuTitle" />}>
          <Table dataSource={menus} bordered size="middle" pagination={{ pageSize: 100 }} rowKey="id">
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
              title={<FormattedMessage id="isHidden" />}
              align="center"
              render={(text, record) => {
                return record.hidden ? '是' : '否';
              }}
            />
            <Table.Column
              align="center"
              width="20%"
              title={<FormattedMessage id="action" />}
              render={this.renderAction.bind(this)}
            />
          </Table>
          {this.state.handler === 'EDIT' && (
            <MenuEdit
              title={<FormattedMessage id="edit" />}
              visible={this.state.handler === 'EDIT'}
              onCancel={this.resetAction.bind(this)}
              onSubmit={this.submitAction.bind(this)}
              data={this.state.handleData}
            />
          )}

          {this.state.handler === 'DELETE' && (
            <MenuDelete
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
