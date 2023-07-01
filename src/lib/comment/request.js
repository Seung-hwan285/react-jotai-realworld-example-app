import { API_END_POINT } from '../../url.js';
import { getHeaders } from '../auth/helper/jwt.js';
import { getLocalStroage } from '../../utils/storage.js';

export const comment_request = {
  getComments: async (slug) => {
    try {
      const response = await fetch(
        `${API_END_POINT}/api/articles/${slug}/comments`,
        {
          method: 'GET',
          headers: getHeaders(getLocalStroage('token')),
        }
      );

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

  deleteComment: async (slug, id) => {
    try {
      const response = await fetch(
        `${API_END_POINT}/api/articles/${slug}/comments/${id}`,
        {
          method: 'DELETE',
          headers: getHeaders(getLocalStroage('token')),
        }
      );

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

  createComment: async (slug, body) => {
    try {
      const response = await fetch(
        `${API_END_POINT}/api/articles/${slug}/comments`,
        {
          method: 'POST',
          headers: getHeaders(getLocalStroage('token')),
          body: JSON.stringify({
            comment: {
              body: body,
            },
          }),
        }
      );

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
};
