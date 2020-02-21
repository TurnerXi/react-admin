import React, { useState } from 'react';
import { Table, Checkbox } from 'antd';

const defaultOptions = ['apple', 'banana', 'orange'];

const columnMap = {
  apple: { title: 'apple', key: 'apple', dataIndex: 'apple' },
  banana: { title: 'banana', key: 'banana', dataIndex: 'banana' },
  orange: { title: 'orange', key: 'orange', dataIndex: 'orange' },
};

const data = [
  {
    key: '1',
    name: 'fruit-1',
    apple: 'apple-10',
    banana: 'banana-10',
    orange: 'orange-10',
  },
  {
    key: '2',
    name: 'fruit-2',
    apple: 'apple-20',
    banana: 'banana-20',
    orange: 'orange-20',
  },
];

export default function() {
  const [columns, setColumns] = useState([
    { title: 'fruitName', key: 'name', dataIndex: 'name' },
    { title: 'banana', key: 'banana', dataIndex: 'banana' },
  ]);

  const onChange = (e, fruit) => {
    if (!e.target.checked) {
      const item = columns.find(item => item.key === fruit);
      const idx = columns.indexOf(item);
      columns.splice(idx, 1);
      setColumns([...columns]);
    } else {
      columns.push(columnMap[fruit]);
      setColumns([...columns]);
    }
  };

  const isChecked = fruit => {
    return !!columns.find(item => item.key === fruit);
  };
  return (
    <>
      <p>不固定表头, 按照点击顺序排序</p>
      <Checkbox onChange={e => onChange(e, 'apple')} checked={isChecked('apple')}>
        apple
      </Checkbox>
      <Checkbox onChange={e => onChange(e, 'banana')} checked={isChecked('banana')}>
        banana
      </Checkbox>
      <Checkbox onChange={e => onChange(e, 'orange')} checked={isChecked('orange')}>
        orange
      </Checkbox>
      <Table columns={columns} dataSource={data} />
    </>
  );
}
