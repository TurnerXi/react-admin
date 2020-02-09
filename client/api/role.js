import request from '@/utils/request';

export function list() {
  return request.get('/role');
}

export function get(id) {
  return request.get(`/role/${id}`);
}

export function create(data) {
  return request.put('/role', data);
}

export function update(data) {
  return request.post('/role', data);
}

export function remove(id) {
  return request.delete(`/role/${id}`);
}

export default {
  list,
  get,
  create,
  update,
  remove,
};
