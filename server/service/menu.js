import { query } from '../common/db';

const list = async () => {
  return await query('select * from sys_menu');
};

const get = async id => {
  const results = await query('select * from sys_menu where id = ?', [id]);
  return results && results[0];
};

const create = async data => {
  const result = await query('insert into sys_menu set ?', data);
  return result.insertId;
};

const update = async data => {
  await query('update sys_menu set title=?,path=?,icon=?,component=?,sort=? where id = ?', [
    data.title,
    data.path,
    data.icon,
    data.component,
    data.sort,
    data.id,
  ]);
};

const remove = async id => {
  await query('delete from sys_menu where id =?', [id]);
};

export default {
  list,
  get,
  create,
  update,
  remove,
};
