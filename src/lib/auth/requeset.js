import { removeStroage } from '../../utils/storage.js';
import { route } from '../../utils/routes.js';
import { cleanHTML } from '../../utils/helper/cleanHTML.js';

export const auth_request = {
  userLogin: async (email, password) => {
    try {
      const response = await fetch('https://api.realworld.io/api/users/login', {
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

  userRegister: async (username, email, password) => {
    try {
      const response = await fetch(`https://api.realworld.io/api/users/`, {
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
      console.log(data);

      if (response.ok) {
        return data;
      } else {
        throw new Error(data.errors);
      }
    } catch (err) {
      console.error(err);
    }
  },

  getUserInfo: async (token) => {
    try {
      const response = await fetch(`https://api.realworld.io/api/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${encodeURIComponent(token)}`,
        },
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

  userLogout: (key) => {
    const user = removeStroage(key);
    if (user === undefined) {
      const SettingContainer = document.querySelector('.Setting__Container');
      if (SettingContainer) {
        SettingContainer.innerHTML = '';
        SettingContainer.remove();
      }
      route('/');
    }
  },
};
