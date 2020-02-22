import React, { useEffect, useState, useContext } from 'react';
import ArticleAPI from '@/api/article';
import { Popconfirm, Button, Table, Card, Form, Rate, Input } from 'antd';
import update from 'immutability-helper';

const EditableContext = React.createContext();

function Operation({ record, editingKey, save, cancel, edit }) {
  return record.key === editingKey ? (
    <span>
      <EditableContext.Consumer>
        {form => (
          <Button type="link" onClick={() => save(form, record.key)} style={{ marginRight: 8 }}>
            Save
          </Button>
        )}
      </EditableContext.Consumer>
      <Popconfirm title="Sure to cancel?" onConfirm={() => cancel(record.key)}>
        <Button type="link">Cancel</Button>
      </Popconfirm>
    </span>
  ) : (
    <Button type="link" disabled={editingKey !== ''} onClick={() => edit(record.key)}>
      Edit
    </Button>
  );
}

function EditableCell({ children, record, title, inputType, dataIndex, editing, ...restProps }) {
  const { getFieldDecorator } = useContext(EditableContext);
  let content = children;
  if (editing) {
    content = (
      <Form.Item style={{ margin: 0 }}>
        {getFieldDecorator(dataIndex, {
          rules: [{ require: true, message: `Please input ${title}!` }],
          initialValue: record[dataIndex],
        })(<Input />)}
      </Form.Item>
    );
  }
  return <td {...restProps}>{content}</td>;
}

function EditableTable({ title, form }) {
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  useEffect(() => {
    ArticleAPI.list().then(data => {
      setData(data.map(item => ({ ...item, key: item.id })));
    });
  }, []);

  const save = (form, key) => {
    form.validateFields((err, formData) => {
      if (err) {
        return;
      }

      const row = data.find(item => item.key === key);
      const index = data.indexOf(row);
      const newData = { ...row, ...formData };
      setData(
        update(data, {
          $splice: [
            [index, 1],
            [index, 0, newData],
          ],
        })
      );
      setEditingKey('');
    });
  };

  const cancel = key => {
    setEditingKey('');
  };

  const edit = key => {
    setEditingKey(key);
  };

  const columns = [
    { title: 'id', dataIndex: 'id', width: '5%' },
    { title: 'timestamp', dataIndex: 'timestamp', width: '15%' },
    { title: 'author', dataIndex: 'author', width: '10%' },
    {
      title: 'importance',
      dataIndex: 'importance',
      width: '20%',
      render(text, record) {
        return <Rate defaultValue={record.importance} disabled />;
      },
    },
    {
      title: 'title',
      dataIndex: 'title',
      onCell: record => ({
        record,
        title: 'title',
        inputType: 'text',
        dataIndex: 'title',
        editing: record.id === editingKey,
      }),
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      width: '15%',
      render: (text, record) => (
        <Operation record={record} editingKey={editingKey} save={save} cancel={cancel} edit={edit} />
      ),
    },
  ];

  return (
    <Card title={title}>
      <EditableContext.Provider value={form}>
        <Table
          dataSource={data}
          columns={columns}
          components={{ body: { cell: EditableCell } }}
          pagination={{ onChange: cancel }}
        />
      </EditableContext.Provider>
    </Card>
  );
}

export default Form.create({ name: 'editableTable' })(EditableTable);
