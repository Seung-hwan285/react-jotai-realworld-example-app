import { API_END_POINT } from '../../url.js';

export const tag_request = {
  getTagsList: async () => {
    try {
      const response = await fetch(`${API_END_POINT}/api/tags`, {
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
};
