import { ReactNode } from 'react';

type ApiResponse<T> = {
  status: number;
  data: T;
};

type ReactI18NextChild = ReactNode;

export const isResponse = <T>(res: unknown): res is ApiResponse<T> => {
  return (
    typeof res === 'object' && res !== null && 'status' in res && 'data' in res
  );
};

declare module 'react' {
  interface HTMLAttributes<T> {
    children?: ReactI18NextChild | ReactI18NextChild[];
  }
}
