import React, { Component } from 'react';
import { Breadcrumb } from 'antd';

export default class CustomBreadcrumb extends Component {
  render() {
    const { routes, location } = this.props;
    return (
      <div>
        <Breadcrumb></Breadcrumb>
      </div>
    );
  }
}
