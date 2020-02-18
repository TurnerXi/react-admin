import React, { useState } from 'react';
import { Button, Card } from 'antd';
import DragModal from '@/assets/components/DragModal';

export default function({ title }) {
  const [visible, setVisible] = useState(false);
  const openDialog = e => {
    setVisible(true);
  };

  const closeDialog = e => {
    setVisible(false);
  };

  return (
    <Card title={title}>
      <Button onClick={openDialog}>Open Dialog</Button>
      <DragModal title={title} visible={visible} onOk={closeDialog} onCancel={closeDialog} maskClosable={false}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </DragModal>
    </Card>
  );
}
