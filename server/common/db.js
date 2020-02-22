import mysql from 'mysql2/promise';
import config from '../config';

const pool = mysql.createPool(config.db);

export const query = async (sql, params) => {
  const [results] = await pool.query(sql, params);
  return results;
};

export const queryPage = async (sql, pageData = { page: 1, limit: 20 }, params = []) => {
  if (params && !Array.isArray(params)) {
    throw new Error('params is not array');
  }
  const { page, limit } = pageData;
  // queryTotal
  const countsql = 'select count(1) as count ' + sql.substring(sql.indexOf('from'));
  // queryData
  const datasql = sql + ' limit ?,?';
  const [[total], [data]] = await Promise.all([
    pool.query(countsql, params),
    pool.query(datasql, [...params, (Number(page) - 1) * Number(limit), Number(limit)]),
  ]);
  return { total: total[0].count, data, page: Number(page), limit: Number(limit) };
};

export default pool;
