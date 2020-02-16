import React from 'react';
import { Icon, Upload } from 'antd';
import I18nProvider from '@/lang';
import '@/assets/css/comp/Dropzone.css';
import { FormattedMessage } from 'react-intl';

const { Dragger } = Upload;

export default function({
  name = 'file',
  action = 'https://www.mocky.io/v2/5185415ba171ea3a00704eed',
  multiple = true,
  onChange,
}) {
  const props = {
    name,
    action,
    multiple,
    onChange,
  };
  return (
    <I18nProvider scope="component">
      <Dragger {...props}>
        <p className="c-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="c-upload-drag-text">
          <FormattedMessage id="dropzoneText" />
        </p>
        <p className="c-upload-drag-hint">
          <FormattedMessage id={multiple ? 'dropzoneHint' : 'dropzoneSingleHint'} />
        </p>
      </Dragger>
    </I18nProvider>
  );
}
