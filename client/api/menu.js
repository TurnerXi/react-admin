import request from '@/utils/request';

function listMenus() {
  return request.get('/api/menu/list');
}

export default {
  listMenus
};
