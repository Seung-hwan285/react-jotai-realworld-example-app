import { axiosInterceptor } from '../../axios/interceptor';
import { isResponse } from '../type-guard/auth';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { NewArticle, Tag } from '../type/article';
import { FeedAndTag } from '../../jotai/article';

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

  getSingleArticle: async (slug: string): Promise<AxiosResponse<any>> => {
    try {
      const result = await axiosInterceptor.get(`/api/articles/${slug}`);

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

  getCommentsFromArticle: async (slug: string): Promise<AxiosResponse<any>> => {
    try {
      const result = await axiosInterceptor.get(
        `/api/articles/${slug}/comments`,
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

  deleteArticle: async (slug: string): Promise<AxiosResponse<any>> => {
    try {
      const result = await axiosInterceptor.delete(`/api/articles/${slug}`);
      if (result.status === 200) {
        return result;
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

  cancelFavorite: async (slug: string) => {
    try {
      const result = await axiosInterceptor.delete(
        `/api/articles/${slug}/favorite`,
      );

      if (result.status === 200) {
        return result;
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

  favorite: async (slug: string) => {
    try {
      const result = await axiosInterceptor.post(
        `/api/articles/${slug}/favorite`,
      );

      if (result.status === 200) {
        return result;
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

      console.log(result);
      if (isResponse(result)) {
        if (result.status === 201) {
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

  getTagArticles: async (tag: string): Promise<AxiosResponse<any>> => {
    try {
      const result = await axiosInterceptor.get(`/api/articles?tag=${tag}`);

      if (isResponse(result)) {
        if (result.status === 200) {
          return result;
        }
      }
      console.log(result);
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

  getAllArticle: async (): Promise<AxiosResponse<any>> => {
    try {
      const result = await axiosInterceptor.get(`/api/articles?offset=0`);

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

  getTag: async (): Promise<AxiosResponse<any>> => {
    try {
      const result = await axiosInterceptor.get(`/api/tags`);

      if (result.status === 200) {
        return result;
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
