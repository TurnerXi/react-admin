import { query } from '../common/db';

export const list = async () => {
  return await query('select * from sys_menu');
};

export const detail = async id => {
  const results = await query('select * from sys_menu where id = ?', [id]);
  return results && results[0];
};

export default {
  list,
  detail,
};
