import { removeStroage } from '../../utils/storage.js';
import { route } from '../../utils/routes.js';
import { API_END_POINT } from '../../url.js';

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

  userRegister: async (username, email, password) => {
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
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${encodeURIComponent(authToken)}`,
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

  userUpdate: async (authToken, email, bio, imageValue) => {
    try {
      const response = await fetch(`${API_END_POINT}/api/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${encodeURIComponent(authToken)}`,
        },
        body: JSON.stringify({
          user: {
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
