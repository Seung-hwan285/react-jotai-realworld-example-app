export const setCookie = (name, value, days) => {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value.trim() || '') + expires + '; path=/';
};

export const getCookie = (name) => {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    let cookie = JSON.parse(cookies[i].substring(name.length + 1));
    cookie = JSON.stringify(cookie);
    if (cookie) {
      return cookie;
    }
  }
  return null;
};

export const removeCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
