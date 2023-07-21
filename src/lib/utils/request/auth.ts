import { axiosInterceptor } from '../../axios/interceptor';
import { setLocalStorage } from '../storage';
import { isResponse } from '../type-guard/auth';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export const authAPI = {
  login: async (email: string | unknown, password: string | unknown) => {
    try {
      const body = {
        email: email,
        password: password,
      };

      const result = await axiosInterceptor.post(
        '/api/users/login',
        JSON.stringify({ user: body }),
      );

      const { data } = result;
      const { token } = data.user;

      if (isResponse(result)) {
        if (result.status === 200) {
          setLocalStorage('token', token);
          return result;
        }
      }
    } catch (err) {
      console.error(err);
    }
  },

  register: async (
    username: string | unknown,
    email: string | unknown,
    password: string | unknown,
  ) => {
    try {
      const body = {
        username: username,
        email: email,
        password: password,
      };

      const result = await axiosInterceptor.post(
        '/api/users',
        JSON.stringify({ user: body }),
      );

      if (isResponse(result)) {
        if (result.status === 200) {
          return result;
        }
      }
    } catch (err) {
      console.error(err);
    }
  },
  getUser: async (): Promise<AxiosResponse<any>> => {
    try {
      const result = await axiosInterceptor.get('/api/user');

      console.log(result);
      if (isResponse(result)) {
        if (result.status === 200) {
          return result;
        }
      }
    } catch (err) {
      console.error(err);
    }

    return {
      data: null,
      status: 500,
      statusText: 'server error',
      headers: {},
      config: {} as InternalAxiosRequestConfig,
    };
  },
};
