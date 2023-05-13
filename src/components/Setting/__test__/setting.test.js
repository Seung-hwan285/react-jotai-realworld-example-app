import SettingForm from '../SettingForm.js';
import { getCookie, removeCookie } from '../../../utils/cookie';

describe('SettingForm', () => {
  const COOKIE_NAME = 'token';

  test('returns a cookie value given a cookie name', () => {
    const mockCookie = [
      {
        email: 'test@test.com',
        username: 'test_user',
        bio: 'test_bio',
        token: 'test_token',
      },
    ];
    document.cookie = `${COOKIE_NAME}=${JSON.stringify(mockCookie)}`;

    const result = JSON.parse(getCookie(COOKIE_NAME));
    expect(result).toEqual(mockCookie);
  });

  test('removes a cookie by setting its expiration date to the past', () => {
    document.cookie = `${COOKIE_NAME}=dummyValue; expires=Fri, 13 May 2023 00:00:00 UTC; path=/;`;

    removeCookie(COOKIE_NAME);
    expect(document.cookie).not.toMatch(COOKIE_NAME);
  });
});
