type ApiResponse<T> = {
  status: number;
  data: T;
};

export const isResponse = (res: any): res is ApiResponse<any> => {
  return typeof res?.status === 'number' && 'data' in res;
};
