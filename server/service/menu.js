import { query } from '../common/db';

export const list = async () => {
  return await query('select * from sys_menu');
};

export default {
  list,
};
