export const isArrayWithItems = <T>(arr: unknown): arr is T[] => {
  return Array.isArray(arr) && arr.length > 0;
};

type InitKey = 'data' | 'user' | 'comment' | 'articles' | 'tags';

type ApiResponse<T> = {
  InitKey: T[] | T;
};

export const isResponseObeject = <T>(
  object: unknown,
): object is ApiResponse<T> => {
  console.log(object);
  return (
    typeof object === 'object' && object !== null && !Array.isArray(object)
  );
};
