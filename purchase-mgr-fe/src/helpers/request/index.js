import axios from 'axios';
import { getToken } from '@/helpers/token/index'

// 设置基础url
const baseUrl = 'http://localhost:3000';


// 得到最终url的方法
const getUrl = (path) => {
  return `${baseUrl}${path}`;
}

// 设置请求头token的方法
const getHeaders = () => {
  return {
    Authorization: `Bearer ${getToken()}`
  }
}


// 对axios进行封装 -> 简化url、同统一设置请求头token
export const post = (url, data) => {
  return axios.post(getUrl(url), data, {
    headers: getHeaders()
  });
}

export const del = (url) => {
  return axios.delete(getUrl(url), {
    headers: getHeaders()
  });
}

export const get = (url, data) => {
  return axios.get(getUrl(url), {
    params: data,
    headers: getHeaders()
  });
}