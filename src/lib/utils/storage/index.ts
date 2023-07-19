export const setLocalStorage = (key: string, value: any) => {
  try {
    window.localStorage.setItem('token', JSON.stringify(value));
  } catch (err) {
    console.error(err);
  }
};

export const getLocalStroage = () => {
  try {
    const value = window.localStorage.getItem('token');
    return value === null ? null : JSON.parse(value);
  } catch (err) {
    console.error(err);
  }
};

export const removeStorage = () => {
  try {
    window.localStorage.removeItem('token');
  } catch (err) {
    console.error(err);
  }
};
