import request from '@/utils/request';

function list() {
  return request.get('/api/menu/list');
}

export default {
  list,
};
