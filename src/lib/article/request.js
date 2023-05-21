import { API_END_POINT } from '../../url.js';
import { getHeaders } from '../../utils/helper/jwt.js';

export const article_request = {
  getAllArticles: async (offset, authToken) => {
    try {
      const response = await fetch(
        `${API_END_POINT}/api/articles?offset=${offset}`,
        {
          method: 'GET',
          headers: getHeaders(authToken),
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

  getTagArticles: async (tag, limit = 20) => {
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
  createArticle: async (articleData) => {
    const { title, description, body, tagList, authToken } = articleData;

    try {
      const response = await fetch(`${API_END_POINT}/api/articles`, {
        method: 'POST',
        headers: getHeaders(authToken),
        body: JSON.stringify({
          article: {
            title: title,
            description: description,
            body: body,
            tagList: tagList,
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

  favorite: async (slug, authToken) => {
    try {
      const response = await fetch(
        `${API_END_POINT}/api/articles/${slug}/favorite`,
        {
          method: 'POST',
          headers: getHeaders(authToken),
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
  cancelFavorite: async (slug, authToken) => {
    try {
      const response = await fetch(
        `${API_END_POINT}/api/articles/${slug}/favorite`,
        {
          method: 'DELETE',
          headers: getHeaders(authToken),
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

  getUserFeedArticles: async (authToken) => {
    try {
      const response = await fetch(`${API_END_POINT}/api/articles/feed`, {
        method: 'GET',
        headers: getHeaders(authToken),
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
