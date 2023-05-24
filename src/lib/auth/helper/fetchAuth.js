import { auth_request } from '../request.js';

export const fetchAuthUserInfo = async (authToken) => {
  if (authToken) {
    const data = await auth_request.getUserInfo(authToken);
    return data.user;
  }
};
