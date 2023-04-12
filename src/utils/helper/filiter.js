export const filiterMethod = (arr, callback) => {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i])) {
      res.push(arr[i]);
    }
  }
  return res;
};
