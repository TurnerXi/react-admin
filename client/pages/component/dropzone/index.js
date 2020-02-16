import React from 'react';
import Dropzone from '@/assets/components/Dropzone';
import { Card, message } from 'antd';

export default function({ title }) {
  const onChange = e => {
    const { file, fileList } = e;
    console.log(fileList);
    if (file.status === 'done') {
      message.success(`${file.name} uploaded successfully`);
    } else if (file.status === 'error') {
      message.error(`${file.name} upload failed`);
    }
  };
  return (
    <Card title={title}>
      <Dropzone onChange={onChange} />
    </Card>
  );
}
