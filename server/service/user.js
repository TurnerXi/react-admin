import { query } from '../common/db';

const list = async () => {
  return await query('select * from sys_user');
};

const get = async id => {
  const results = await query('select * from sys_user where id = ?', [id]);
  return results && results[0];
};

const create = async data => {
  await query('insert into sys_user set ?', data);
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
