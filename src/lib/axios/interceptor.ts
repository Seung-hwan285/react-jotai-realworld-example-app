import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { getLocalStroage } from '../utils/storage';

const apiConfig: any = {
  baseURL: process.env.REACT_APP_URL,
};

const APi: AxiosInstance = axios.create(apiConfig);

const isRequest = (config: InternalAxiosRequestConfig) => {
  const { method, url } = config;
  config.headers['Content-Type'] = 'application/json';

  const token = getLocalStroage('token');

  if (token) {
    config.headers['Authorization'] = `Token ${encodeURIComponent(token)}`;
  }

  // console.log(`[API] ${method?.toUpperCase()} ${url} |Request`);

  return config;
};
const isErrorResponse = (
  error: AxiosError | Error,
  config: InternalAxiosRequestConfig,
) => {
  if (axios.isAxiosError(error)) {
    const { message } = error;
    const { url } = config;
    const { status } = (error.response as AxiosResponse) ?? {};

    switch (status) {
      case 401: {
        alert(message);
        break;
      }
      case 403: {
        if (url === '/api/users/login') {
          alert('Email or password is incorrect.');
        }
        break;
      }
      case 404: {
        alert(message);
        break;
      }
      case 500: {
        alert(message);
        break;
      }
      case 422: {
        if (url === '/api/users') {
          alert('There are duplicate values. Please enter differently');
        }
        break;
      }
      default: {
        break;
      }
    }
  } else {
    console.error(`[API] | Error ${error.message}`);
  }

  return Promise.reject(error);
};

const isResponse = (response: AxiosResponse) => {
  const { method, url } = response.config;
  // console.log(`[API] ${method?.toUpperCase()} ${url} |Request`);

  return response;
};

const setUpIntercepters = (instance: AxiosInstance) => {
  instance.interceptors.request.use(isRequest, (error) =>
    isErrorResponse(error, error.config),
  );
  instance.interceptors.response.use(isResponse, (error) =>
    isErrorResponse(error, error.config),
  );

  return instance;
};

export const axiosInterceptor = setUpIntercepters(APi);
