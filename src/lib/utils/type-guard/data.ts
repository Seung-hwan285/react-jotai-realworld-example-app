type InitKey = 'data' | 'user' | 'comment' | 'articles' | 'tags';

type ApiResponse<T> = {
  [K in InitKey]: T[] | T;
};

export const isArrayWithItems = <T>(arr: unknown): arr is T[] => {
  return Array.isArray(arr) && arr.length > 0;
};

export const isResponseObeject = <T>(
  object: unknown,
): object is ApiResponse<T> => {
  return (
    typeof object === 'object' && object !== null && !Array.isArray(object)
  );
};
