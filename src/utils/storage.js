export const setLocalStroage = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(err);
  }
};
export const getLocalStroage = (key) => {
  try {
    const value = window.localStorage.getItem(key);
    return value === null ? null : JSON.parse(value);
  } catch (err) {
    console.error(err);
  }
};
export const removeStroage = (key) => {
  try {
    window.localStorage.removeItem(key);
  } catch (err) {
    console.error(err);
  }
};

export const setSessionStroage = (key, value) => {
  console.log(value);
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(err);
  }
};

export const getSessionStroage = (key) => {
  try {
    const value = window.sessionStorage.getItem(key);
    return value === null ? null : JSON.parse(value);
  } catch (err) {
    console.error(err);
  }
};
export const removeSessionStroage = (key) => {
  try {
    window.sessionStorage.removeItem(key);
  } catch (err) {
    console.error(err);
  }
};
