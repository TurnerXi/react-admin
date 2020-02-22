import { query } from '../common/db';

const list = async params => {
  let sql = 'select * from article order by ??  limit ?,?';
  const page = params.page - 1 || 0;
  const pageSize = params.limit || 20;
  return await query(sql, [params.sort || 'id', page, pageSize]);
};

const get = async id => {
  const results = await query('select * from article where id = ?', [id]);
  return results && results[0];
};

const create = async data => {
  await query('insert into article set ?', data);
};

const update = async data => {
  const template = Object.keys(data)
    .filter(key => key !== 'id' && data[key])
    .map(key => `${key}=${data[key]}`);
  await query('update article set ?? where id=?', [template, data.id]);
};

const remove = async id => {
  await query('delete from article where id=?', [id]);
};

export default {
  list,
  get,
  create,
  update,
  remove,
};
