import request from '@/utils/request';

export function list(params) {
  return request.get('/article', { params });
}

export function get(id) {
  return request.get(`/article/${id}`);
}

export function create(data) {
  return request.put('/article', data);
}

export function update(data) {
  return request.post('/article', data);
}

export function remove(id) {
  return request.delete(`/article/${id}`);
}

export default {
  list,
  get,
  create,
  update,
  remove,
};
