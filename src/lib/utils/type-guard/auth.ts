import { ReactNode } from 'react';
import { AxiosResponse } from 'axios';

type ApiResponse<T> = {
  status: number;
  data: T;
};
export const isResponse = <T>(res: unknown): res is ApiResponse<T> => {
  return (
    typeof (res as AxiosResponse<T>)?.status === 'number' &&
    'data' in (res as AxiosResponse<T>)
  );
};

type ReactI18NextChild = ReactNode;

declare module 'react' {
  interface HTMLAttributes<T> {
    children?: ReactI18NextChild | ReactI18NextChild[];
  }
}
