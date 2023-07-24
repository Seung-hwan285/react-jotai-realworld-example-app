import { ReactNode } from 'react';

type ApiResponse<T> = {
  status: number;
  data: T;
};

export const isResponse = (res: any): res is ApiResponse<any> => {
  return (
    typeof res?.status === 'number' &&
    ('data' in res || 'article' in res || 'user' in res || 'comment' in res)
  );
};

type ReactI18NextChild = ReactNode;

declare module 'react' {
  interface HTMLAttributes<T> {
    children?: ReactI18NextChild | ReactI18NextChild[];
  }
}
