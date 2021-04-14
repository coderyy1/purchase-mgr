import { post, get, del } from '../../helpers/request/index';

//获取各数据总数的请求
export const total = () => {
  return get('/home/total');
}

//获取需求完成情况的请求
export const demandFinish = () => {
  return get('/home/demandFinish');
}

//获取用户情况的请求
export const userChara = () => {
  return get('/home/userCharact');
}

//获取今日新增的请求
export const todayNew = () => {
  return get('/home/todayNew');
}