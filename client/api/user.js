import request from '@/utils/request';

export function list() {
  return request.get('/user');
}

export function get(id) {
  return request.get(`/user/${id}`);
}

export function create(data) {
  return request.put('/user', data);
}

export function update(data) {
  return request.post('/user', data);
}

export function remove(id) {
  return request.delete(`/user/${id}`);
}

export default {
  list,
  get,
  create,
  update,
  remove,
};
