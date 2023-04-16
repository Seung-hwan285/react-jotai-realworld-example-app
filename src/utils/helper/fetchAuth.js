import { auth_request } from '../../lib/auth/request.js';

export const fetchAuthUserInfo = async (authToken) => {
  if (authToken) {
    const data = await auth_request.getUserInfo(authToken);
    console.log(data);
    return data.user;
  }
};
