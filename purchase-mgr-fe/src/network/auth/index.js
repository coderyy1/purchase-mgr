import { post } from '@/helpers/request/index';

export const register = (account, password, inviteCode, key = '') => {
  return post('/auth/register', {
    account,
    password,
    inviteCode,
    key
  });
};

export const login = (account, password) => {
  return post('/auth/login', {
    account,
    password
  });
};