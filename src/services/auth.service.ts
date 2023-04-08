/* eslint-disable import/no-extraneous-dependencies */

import { message } from 'antd';
import { deleteCookie, setCookie } from 'cookies-next';
import type { ReactNode } from 'react';

import httpAuth from '@/http/http.auth';

export const LoginApi = (payload: any, navigate: any, icon: ReactNode) => {
  httpAuth
    .post('/login', {
      ...payload,
    })
    .then((res: any) => {
      setCookie('USER_TOKEN', res.data.data.token);
      navigate.push('/data/management');
      message.success({
        content: `Welcome, ${res.data.data.user.firstName}`,
        icon,
      });
    })
    .catch((_err: any) => {
      message.error('Invalid credential');
    });
};

export const RegisterApi = (payload: any, navigate: any) => {
  httpAuth
    .post('/register', {
      ...payload,
    })
    .then((res) => {
      console.log(res);
      message.success('Account regitered');
      navigate.push('/auth/login');
    })
    .catch((err) => {
      console.log(err);
      message.error('Invalid Credential');
    });
};

export const LogoutApi = (navigate: any) => {
  deleteCookie('USER_TOKEN');
  navigate.push('/auth/login');
};
