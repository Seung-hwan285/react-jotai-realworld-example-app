import SettingForm from '../SettingForm.js';
import { getCookie, removeCookie } from '../../../utils/cookie';

describe('SettingForm', () => {
  test('returns the cookie value given the cookie name', () => {
    const cookieName = 'token';

    const expectedCookie = [
      {
        email: 'test@test.com',
        test_username: 'test_user',
        bio: 'test_bio',
        token: 'test_token',
      },
    ];

    const cookieValue = [
      {
        email: 'test@test.com',
        test_username: 'test_user',
        bio: 'test_bio',
        token: 'test_token',
      },
    ];

    document.cookie = `${cookieName}=${JSON.stringify(cookieValue)}`;

    const result = JSON.parse(getCookie(cookieName));

    expect(result).toEqual(expectedCookie);
  });

  test('removes a cookie by setting its expiration date to the past', () => {
    const cookieName = 'token';
    document.cookie = `${cookieName}=dummyValue; expires=Fri, 13 May 2023 00:00:00 UTC; path=/;`;

    removeCookie(cookieName);
    expect(document.cookie).not.toMatch(cookieName);
  });
});
