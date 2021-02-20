import { post, get, del } from '../../helpers/request/index';

//添加需求的请求
export const add = (data) => {
  return post('/demand/add', data);
}

//获取list、查询的请求
export const list = (data) => {
  return get('/demand/list', data);
}

//删除需求的请求
export const deleteDemand = (id) => {
  return del(`/demand/deleteDemand/${id}`);
}

//修改需求信息的请求
export const update = (data) => {
  return post('/demand/update', data);
}

//详情页面的请求
export const detail = (id) => {
  return get(`/demand/detail/${id}`);
}