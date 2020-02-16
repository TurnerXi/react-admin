import React from 'react';
import { Card, Alert } from 'antd';
import I18nProvider from '@/lang';
import AvatarUpload from '@/assets/components/AvatarUpload';
import { FormattedHTMLMessage } from 'react-intl';

export default function({ title }) {
  const style = {
    width: 'fit-content',
    margin: '50px auto',
  };
  return (
    <I18nProvider scope="components">
      <Card title={title}>
        <Alert message={<FormattedHTMLMessage id="avatarUploadTips" />} type="info" showIcon />
        <div style={style}>
          <AvatarUpload />
        </div>
      </Card>
    </I18nProvider>
  );
}
