import { auth_request } from '../../lib/auth/requeset.js';

export const fetchAuthUserInfo = async authToken => {
  if (authToken) {
    const data = await auth_request.getUserInfo(authToken);
    return data.user;
  }
};
