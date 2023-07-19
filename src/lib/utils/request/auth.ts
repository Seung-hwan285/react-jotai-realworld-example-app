import { axiosInterceptor } from '../../axios/interceptor';
import { setLocalStorage } from '../storage';
import { isLoginResponse, isRegisterResponse } from '../type-gaurd/auth';

export const authAPI = {
  login: async (email: string | unknown, password: string | unknown) => {
    try {
      const body = {
        email: email,
        password: password,
      };
      // Email
      const result = await axiosInterceptor.post(
        '/api/users/login',
        JSON.stringify({ user: body }),
      );

      const { data } = result;

      if (isLoginResponse(data)) {
        if (result.status === 200) {
          setLocalStorage('token', data);
          return result;
        }
      }
    } catch (err: any) {
      throw new Error(err);
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

      if (isRegisterResponse(result)) {
        if (result.status === 200) {
          return result;
        }
      }
    } catch (err: any) {
      console.error(err);
    }
  },
};
