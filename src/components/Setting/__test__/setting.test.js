import SettingForm from '../SettingForm.js';
import { getCookie, removeCookie } from '../../../utils/cookie';

describe('SettingForm', () => {
  test('returns the cookie value given the cookie name', () => {
    const COOKIE_NAME = 'token';

    const mockCookie = [
      {
        email: 'test@test.com',
        test_username: 'test_user',
        bio: 'test_bio',
        token: 'test_token',
      },
    ];

    document.cookie = `${COOKIE_NAME}=${JSON.stringify(mockCookie)}`;

    const result = JSON.parse(getCookie(COOKIE_NAME));
    expect(result).toEqual(mockCookie);
  });

  test('removes a cookie by setting its expiration date to the past', () => {
    const cookieName = 'token';
    document.cookie = `${cookieName}=dummyValue; expires=Fri, 13 May 2023 00:00:00 UTC; path=/;`;

    removeCookie(cookieName);
    expect(document.cookie).not.toMatch(cookieName);
  });
});
