import { removeSessionStroage, removeStroage } from '../../utils/storage.js';
import { route } from '../../utils/routes.js';
import { API_END_POINT } from '../../url.js';
import { removeCookie } from '../../utils/cookie.js';
import { getHeaders } from './helper/jwt.js';

export const auth_request = {
  userLogin: async (loginData) => {
    const { email, password } = loginData;
    try {
      const response = await fetch(`${API_END_POINT}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: email,
            password: password,
          },
        }),
      });
      const data = await response.json();

      if (response.ok) {
        const token = data.user.token;
        return token;
      } else {
        throw new Error(data.errors);
      }
    } catch (err) {
      console.error(err);
    }
  },

  userRegister: async (registerData) => {
    const { username, email, password } = registerData;
    try {
      const response = await fetch(`${API_END_POINT}/api/users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            username: username,
            email: email,
            password: password,
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        throw new Error(data.errors);
      }
    } catch (err) {
      console.error(err);
    }
  },

  getUserInfo: async (authToken) => {
    try {
      const response = await fetch(`${API_END_POINT}/api/user`, {
        method: 'GET',
        headers: getHeaders(authToken),
      });

      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        throw new Error(data.errors);
      }
    } catch (err) {
      console.error(err);
    }
  },

  userUpdate: async (settingData) => {
    const { authToken, username, email, bio, imageValue } = settingData;

    console.log(username);

    try {
      const response = await fetch(`${API_END_POINT}/api/user`, {
        method: 'PUT',
        headers: getHeaders(authToken),
        body: JSON.stringify({
          user: {
            username: username,
            email: email,
            bio: bio,
            image: imageValue,
          },
        }),
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  },

  userLogout: (key) => {
    removeStroage(key);
    removeCookie('authToken');
    removeSessionStroage('selectTag');
    route('/');
  },
};
