import { API_END_POINT } from '../../url.js';
const headers = {
  getHeaders: (authToken) => {
    if (authToken) {
      return {
        'Content-Type': 'application/json',
        Authorization: `Token ${encodeURIComponent(authToken)}`,
      };
    } else {
      return {
        'Content-Type': 'application/json',
      };
    }
  },
};

export const article_request = {
  getAllArticles: async (offset, authToken) => {
    console.log(headers.getHeaders());
    try {
      const response = await fetch(
        `${API_END_POINT}/api/articles?offset=${offset}`,
        {
          method: 'GET',
          headers: headers.getHeaders(authToken),
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
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${encodeURIComponent(authToken)}`,
        },
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
