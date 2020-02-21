import React, { useState } from 'react';
import { Table, Checkbox } from 'antd';

const defaultOptions = ['apple', 'banana', 'orange'];
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
  const [options, setOptions] = useState(defaultOptions);

  const columns = [{ title: 'fruitName', key: 'name', dataIndex: 'name' }].concat(
    [
      { title: 'apple', key: 'apple', dataIndex: 'apple' },
      { title: 'banana', key: 'banana', dataIndex: 'banana' },
      { title: 'orange', key: 'orange', dataIndex: 'orange' },
    ].filter(item => options.indexOf(item.key) > -1)
  );

  const onChange = (e, fruit) => {
    if (options.indexOf(fruit) > -1) {
      setOptions(options.filter(op => op !== fruit));
    } else {
      options.push(fruit);
      setOptions([...options]);
    }
  };
  return (
    <>
      <p>固定表头, 按照表头顺序排序</p>
      <Checkbox onChange={e => onChange(e, 'apple')} checked={options.indexOf('apple') > -1}>
        apple
      </Checkbox>
      <Checkbox onChange={e => onChange(e, 'banana')} checked={options.indexOf('banana') > -1}>
        banana
      </Checkbox>
      <Checkbox onChange={e => onChange(e, 'orange')} checked={options.indexOf('orange') > -1}>
        orange
      </Checkbox>
      <Table columns={columns} dataSource={data} />
    </>
  );
}
