import { axiosInterceptor } from '../../axios/interceptor';
import { isResponse } from '../type-guard/auth';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export const ArticlesAPI = {
  getUserArticles: async (author: string): Promise<AxiosResponse<any>> => {
    try {
      const result = await axiosInterceptor.get(
        `/api/articles?author=${author}&offset=0`,
      );

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

  getFavoriteArticles: async (author: string): Promise<AxiosResponse<any>> => {
    try {
      const result = await axiosInterceptor.get(
        `/api/articles?favorited=${author}&offset=0`,
      );

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
