import { query } from '../common/db';

const list = async params => {
  let sql = 'select * from sys_lang where 1=1';
  const data = [];
  if (params.scope) {
    sql += ' and scope in (?)';
    data.push(params.scope);
  }
  sql += ' order by scope, code';
  return await query(sql, data);
};

const get = async id => {
  const results = await query('select * from sys_lang where id = ?', [id]);
  return results && results[0];
};

const create = async data => {
  await query('insert into sys_lang set ?', data);
};

const update = async data => {
  await query('update sys_lang set code=?, scope=?, zh=?, en=? where id=?', [
    data.code,
    data.scope,
    data.zh,
    data.en,
    data.id,
  ]);
};

const remove = async id => {
  await query('delete from sys_lang where id=?', [id]);
};

export default {
  list,
  get,
  create,
  update,
  remove,
};
