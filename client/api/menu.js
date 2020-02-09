import request from '@/utils/request';

export function tree() {
  return request.get('/menu/tree');
}

export function list() {
  return request.get('/menu');
}

export function detail(id) {
  return request.get(`/menu/${id}`);
}

export function update(data) {
  return request.post('/menu', data);
}
export default {
  tree,
  list,
  detail,
  update,
};
