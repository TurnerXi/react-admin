import request from '@/utils/request';

export function list(params) {
  return request.get('/lang', {
    params,
  });
}

export function get(id) {
  return request.get(`/lang/${id}`);
}

export function create(data) {
  return request.put('/lang', data);
}

export function update(data) {
  return request.post('/lang', data);
}

export function remove(id) {
  return request.delete(`/lang/${id}`);
}

export default {
  list,
  get,
  create,
  update,
  remove,
};
