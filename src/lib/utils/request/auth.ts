import { axiosInterceptor } from '../../axios/interceptor';
import { setLocalStorage } from '../storage';
import { isResponse } from '../type-guard/auth';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { Setting } from '../type/auth';

const SERVER_ERROR_RESPONSE: AxiosResponse<any> = {
  data: null,
  status: 500,
  statusText: 'server error',
  headers: {},
  config: {} as InternalAxiosRequestConfig,
};

export const AuthAPI = {
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

      if (isResponse(result) && result.status === 200) {
        setLocalStorage('token', token);
        return result;
      }
    } catch (err) {
      console.error(err);
    }
  },
  updateUser: async (data: Setting): Promise<AxiosResponse<any>> => {
    try {
      const result = await axiosInterceptor.put(
        `/api/user`,
        JSON.stringify({ user: data }),
      );

      if (isResponse(result) && result.status === 200) {
        return result;
      }
    } catch (err) {
      console.error(err);
    }

    return SERVER_ERROR_RESPONSE;
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

      if (isResponse(result) && result.status === 200) {
        return result;
      }
    } catch (err) {
      console.error(err);
    }
  },

  getUser: async (): Promise<AxiosResponse<any>> => {
    try {
      const result = await axiosInterceptor.get('/api/user');
      if (isResponse(result) && result.status === 200) {
        return result;
      }
    } catch (err) {
      console.error(err);
    }

    return SERVER_ERROR_RESPONSE;
  },
};
