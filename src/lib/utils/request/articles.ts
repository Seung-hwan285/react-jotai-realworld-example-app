import { axiosInterceptor } from '../../axios/interceptor';
import { isResponse } from '../type-guard/auth';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import {
  NewArticle,
  PropsArticle,
  PropsTag,
  UpdateArticle,
} from '../type/article';
import { Comments } from '../type/comment';

const SERVER_ERROR_RESPONSE: AxiosResponse<any> = {
  data: null,
  status: 500,
  statusText: 'server error',
  headers: {},
  config: {} as InternalAxiosRequestConfig,
};

export const ArticlesAPI = {
  getUserArticles: async (
    author: string | unknown,
  ): Promise<AxiosResponse<any>> => {
    try {
      const result = await axiosInterceptor.get(
        `/api/articles?author=${author}&offset=0`,
      );

      if (isResponse<PropsArticle>(result) && result.status === 200) {
        return result;
      }
    } catch (err) {
      console.error(err);
    }
    return SERVER_ERROR_RESPONSE;
  },

  getFavoriteArticles: async (
    author: string | unknown,
  ): Promise<AxiosResponse<any>> => {
    try {
      const result = await axiosInterceptor.get(
        `/api/articles?favorited=${author}&offset=0`,
      );

      if (isResponse<PropsArticle>(result) && result.status === 200) {
        return result;
      }
    } catch (err) {
      console.error(err);
    }

    return SERVER_ERROR_RESPONSE;
  },

  getSingleArticle: async (slug: string): Promise<AxiosResponse<any>> => {
    try {
      const result = await axiosInterceptor.get(`/api/articles/${slug}`);

      if (isResponse<PropsArticle>(result) && result.status === 200) {
        return result;
      }
    } catch (err) {
      console.error(err);
    }

    return SERVER_ERROR_RESPONSE;
  },

  getCommentsFromArticle: async (slug: string): Promise<AxiosResponse<any>> => {
    try {
      const result = await axiosInterceptor.get(
        `/api/articles/${slug}/comments`,
      );

      if (isResponse<Comments>(result) && result.status === 200) {
        return result;
      }
    } catch (err) {
      console.error(err);
    }

    return SERVER_ERROR_RESPONSE;
  },

  deleteArticle: async (slug: string): Promise<AxiosResponse<any>> => {
    try {
      const result = await axiosInterceptor.delete(`/api/articles/${slug}`);

      if (isResponse<Comments>(result) && result.status === 200) {
        return result;
      }
    } catch (err) {
      console.error(err);
    }

    return SERVER_ERROR_RESPONSE;
  },

  updateArticle: async (
    slug: string,
    body: UpdateArticle,
  ): Promise<AxiosResponse<any>> => {
    try {
      const result = await axiosInterceptor.put(
        `/api/articles/${slug}`,
        JSON.stringify({ article: body }),
      );

      if (isResponse<PropsArticle>(result) && result.status === 200) {
        return result;
      }
    } catch (err) {
      console.error(err);
    }

    return SERVER_ERROR_RESPONSE;
  },

  cancelFavorite: async (slug: string) => {
    try {
      const result = await axiosInterceptor.delete(
        `/api/articles/${slug}/favorite`,
      );

      if (isResponse(result) && result.status === 200) {
        return result;
      }
    } catch (err) {
      console.error(err);
    }

    return SERVER_ERROR_RESPONSE;
  },

  favorite: async (slug: string) => {
    try {
      const result = await axiosInterceptor.post(
        `/api/articles/${slug}/favorite`,
      );

      if (isResponse(result) && result.status === 200) {
        return result;
      }
    } catch (err) {
      console.error(err);
    }

    return SERVER_ERROR_RESPONSE;
  },

  createArticle: async ({
    title,
    description,
    body,
    tags,
  }: NewArticle): Promise<AxiosResponse<any>> => {
    try {
      const bodyArticle = {
        title: title,
        description: description,
        body: body,
        tagList: tags,
      };

      const result = await axiosInterceptor.post(
        `/api/articles`,
        JSON.stringify({ article: bodyArticle }),
      );

      if (isResponse<PropsArticle>(result) && result.status === 200) {
        return result;
      }
    } catch (err) {
      console.error(err);
    }
    return SERVER_ERROR_RESPONSE;
  },

  getTagArticles: async (
    tag: string | undefined,
  ): Promise<AxiosResponse<any>> => {
    try {
      const result = await axiosInterceptor.get(`/api/articles?tag=${tag}`);

      if (isResponse<PropsArticle>(result) && result.status === 200) {
        return result;
      }
    } catch (err) {
      console.error(err);
    }

    return SERVER_ERROR_RESPONSE;
  },

  getAllArticle: async (page: number): Promise<AxiosResponse<any>> => {
    try {
      const result = await axiosInterceptor.get(`/api/articles?offset=${page}`);

      if (isResponse<PropsArticle>(result) && result.status === 200) {
        return result;
      }
    } catch (err) {
      console.error(err);
    }

    return SERVER_ERROR_RESPONSE;
  },

  getTag: async (): Promise<AxiosResponse<any>> => {
    try {
      const result = await axiosInterceptor.get(`/api/tags`);

      if (isResponse<PropsTag>(result) && result.status === 200) {
        return result;
      }
    } catch (err) {
      console.error(err);
    }
    return SERVER_ERROR_RESPONSE;
  },
};
