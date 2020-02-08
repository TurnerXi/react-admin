import mysql from 'mysql2/promise';
import config from '../config';

const pool = mysql.createPool(config.db);

export const query = async (sql, params) => {
  const [results] = await pool.query(sql, params);
  return results;
};

export default pool;
