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
      console.log(data);
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
