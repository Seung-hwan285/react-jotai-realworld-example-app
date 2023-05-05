import { API_END_POINT } from '../../url.js';

export const article_request = {
  getAllArticles: async (offset) => {
    try {
      const response = await fetch(
        `${API_END_POINT}/api/articles?offset=${offset}`,
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
  getTagArticles: async (tag) => {
    try {
      const response = await fetch(`${API_END_POINT}/api/articles?tag=${tag}`, {
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
  getUserFeedArticles: async (authToken) => {
    try {
      const response = await fetch(`${API_END_POINT}/api/articles/feed`, {
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
        throw new Error(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  },
};
