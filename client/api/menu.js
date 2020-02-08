import request from '@/utils/request';

export function tree() {
  return request.get('/api/menu/tree');
}

export function list() {
  return request.get('/api/menu/list');
}

export function detail(id) {
  return request.get(`/api/menu/${id}`);
}

export default {
  tree,
  list,
  detail,
};
