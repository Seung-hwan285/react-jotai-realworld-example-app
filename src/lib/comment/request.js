import { API_END_POINT } from '../../url.js';
import { getHeaders } from '../../utils/helper/jwt.js';
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
    } catch (e) {
      console.error(e);
    }
  },
};
