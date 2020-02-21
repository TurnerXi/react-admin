import request from '@/utils/request';

export const realTime = function() {
  return request.get('https://tianqiapi.com/api?version=v6&appid=63737522&appsecret=ZUV9NiGy&vue=1');
};

export const recent = function() {
  return request.get('https://tianqiapi.com/api?version=v1&appid=63737522&appsecret=ZUV9NiGy&vue=1');
};

export default {
  realTime,
  recent,
};
