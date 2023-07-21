import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { axiosInterceptor } from '../../axios/interceptor';
import { isResponse } from '../type-guard/auth';

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
