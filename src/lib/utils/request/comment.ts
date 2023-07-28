import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { axiosInterceptor } from '../../axios/interceptor';
import { isResponse } from '../type-guard/auth';

const SERVER_ERROR_RESPONSE: AxiosResponse<any> = {
  data: null,
  status: 500,
  statusText: 'server error',
  headers: {},
  config: {} as InternalAxiosRequestConfig,
};

export const CommentAPI = {
  createComment: async (
    slug: string,
    body: string,
  ): Promise<AxiosResponse<any>> => {
    try {
      const result = await axiosInterceptor.post(
        `/api/articles/${slug}/comments`,
        JSON.stringify({
          comment: {
            body: body,
          },
        }),
      );

      if (isResponse(result) && result.status === 200) {
        return result;
      }
    } catch (err) {
      console.error(err);
    }

    return SERVER_ERROR_RESPONSE;
  },

  deleteComment: async (
    slug: string,
    id: number,
  ): Promise<AxiosResponse<any>> => {
    try {
      const result = await axiosInterceptor.delete(
        `/api/articles/${slug}/comments/${id}`,
      );

      if (isResponse(result) && result.status === 200) {
        return result;
      }
    } catch (err) {
      console.error(err);
    }

    return SERVER_ERROR_RESPONSE;
  },
};
