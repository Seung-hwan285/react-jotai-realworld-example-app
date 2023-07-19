type ApiResponse<T> = {
  status: number;
  data: T;
};

export const isLoginResponse = (res: any): res is ApiResponse<any> => {
  return typeof res?.status === 'number' && 'data' in res;
};

export const isRegisterResponse = (res: any): res is ApiResponse<any> => {
  return typeof res?.status === 'number' && 'data' in res;
};
