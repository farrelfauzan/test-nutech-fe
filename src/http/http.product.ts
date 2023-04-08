/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
import axios from 'axios';
import { deleteCookie, getCookie } from 'cookies-next';
import { NextResponse } from 'next/server';

const token = getCookie('USER_TOKEN');

const httpProduct = axios.create({
  baseURL: 'http://3.104.54.2:3000/api',
  timeout: 5000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'x-token': token,
    'Content-Type': 'multipart/json',
  },
});

// Add a request interceptor
httpProduct.interceptors.request.use(
  async (config) => {
    if (token) {
      // config.headers.Authorization = `Bearer ${token}`;
      config.headers.Authorization = `${token}`;
      config.headers['Content-Type'] = 'multipart/json';
      config.headers.Accept = 'multipart/json';
    }
    // Do something before request is sent
    return config;
  },
  (error: any) =>
    // Do something with request error
    // eslint-disable-next-line implicit-arrow-linebreak
    Promise.reject(error)
);

// Response interceptor for API calls
httpProduct.interceptors.response.use(
  (response) =>
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // get response error code

    response,
  async (error) => {
    const { status } = error.response;
    // Do something with response error
    if (status === 401) {
      if (status === 403) {
        deleteCookie('USER_TOKEN');
        NextResponse.redirect('http://localhost:3000/auth/login');
      }
    }
    return Promise.reject(error);
  }
);

export default httpProduct;
