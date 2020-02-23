import { query } from '../common/db';

const list = async () => {
  return await query('select * from sys_user');
};

const get = async id => {
  const results = await query('select * from sys_user where id = ?', [id]);
  return results && results[0];
};

const create = async data => {
  const result = await query('insert sys_user sys_menu set ?', data);
  return result.insertId;
};

const update = async data => {
  await query('update sys_user set name=?, email=? where id=?', [data.name, data.email, data.id]);
};

const remove = async code => {
  await query('delete from sys_user where id=?', [code]);
};

export default {
  list,
  get,
  create,
  update,
  remove,
};
