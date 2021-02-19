import { post, get, del } from '../../helpers/request/index';

//添加需求的请求
export const add = (data) => {
  return post('/demand/add', data);
}

//获取list、查询的请求
export const list = (data) => {
  return get('/demand/list', data);
}