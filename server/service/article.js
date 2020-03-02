import { query, queryPage } from '../common/db';

const list = async params => {
  let condition = [];
  if (params.title) {
    condition.push(`title like '%${params.title}%'`);
  }
  if (params.importance) {
    condition.push(`importance = ${params.importance}`);
  }
  if (params.status) {
    condition.push(`status = '${params.status}'`);
  }
  if (params.type) {
    condition.push(`type = '${params.type}'`);
  }

  const conditions = condition.length > 0 ? 'where ' + condition.join(' and ') : '';
  let sql = `select * from article ${conditions} order by ?? `;
  return await queryPage(sql, { page: params.page, limit: params.limit }, [params.sort || 'id']);
};

const get = async id => {
  const results = await query('select * from article where id = ?', [id]);
  return results && results[0];
};

const create = async data => {
  const result = await query('insert into article set ?', data);
  return result.insertId;
};

const update = async data => {
  const template = Object.keys(data)
    .filter(key => key !== 'id' && data[key])
    .map(key => `${key}='${data[key]}'`)
    .join(',');
  await query(`update article set ${template} where id=?`, [data.id]);
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
