import { query } from '../common/db';

const list = async () => {
  return await query('select * from sys_lang order by scope, code');
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
