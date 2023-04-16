import { API_END_POINT } from '../../url.js';

export const article_request = {
  getAllArticles: async () => {
    try {
      const response = await fetch(`${API_END_POINT}/api/articles`, {
        method: 'GET',
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

  getFeedAricle: async (limit) => {
    try {
      const response = await fetch(
        `${API_END_POINT}/api/articles/feed?limit=${limit}`,
        {
          method: 'GET',
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
