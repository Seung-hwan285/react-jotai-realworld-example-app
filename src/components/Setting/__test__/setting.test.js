import SettingForm from '../SettingForm.js';
import { getCookie, removeCookie } from '../../../utils/cookie';
import { setLocalStroage, setSessionStroage } from '../../../utils/storage';
import { auth_request } from '../../../lib/auth/request';

describe('SettingForm', () => {
  const TOKEN_NAME = 'token';
  const mockCookie = [
    {
      email: 'test@test.com',
      username: 'test_user',
      bio: 'test_bio',
      token: 'test_token',
    },
  ];

  beforeEach(() => {
    document.cookie = `${TOKEN_NAME}=${JSON.stringify(mockCookie)}`;
    setLocalStroage(TOKEN_NAME);
    setSessionStroage(TOKEN_NAME);
  });

  test('returns a cookie value given a cookie name', () => {
    const result = JSON.parse(getCookie(TOKEN_NAME));
    expect(result).toEqual(mockCookie);
  });

  test('removes a cookie by setting its expiration date to the past', () => {
    document.cookie = `${TOKEN_NAME}=dummyValue; expires=Fri, 13 May 2023 00:00:00 UTC; path=/;`;
    removeCookie(TOKEN_NAME);
    expect(document.cookie).not.toMatch(TOKEN_NAME);
  });

  test('updates state when input values change', () => {
    // for input element test
    const inputElements = document.createElement('input');

    const form = document.createElement('form');
    form.className = 'form';

    const button = document.createElement('button');
    button.className = 'logout';

    document.body.appendChild(inputElements);
    form.appendChild(button);
    document.body.appendChild(form);

    const settingForm = new SettingForm();

    const events = [
      {
        target: {
          name: 'image',
          value: 'test_image',
        },
      },
      {
        target: {
          name: 'username',
          value: 'hwan',
        },
      },
      {
        target: {
          name: 'bio',
          value: 'test_bio',
        },
      },
      {
        target: {
          name: 'email',
          value: 'test@test.com',
        },
      },
    ];

    const expectedStates = [
      {
        image: 'test_image',
        username: '',
        bio: '',
        email: '',
      },
      {
        image: 'test_image',
        username: 'hwan',
        bio: '',
        email: '',
      },

      {
        image: 'test_image',
        username: 'hwan',
        bio: 'test_bio',
        email: '',
      },
      {
        image: 'test_image',
        username: 'hwan',
        bio: 'test_bio',
        email: 'test@test.com',
      },
    ];

    events.forEach((event, idx) => {
      settingForm.handleChange(event);
      expect(settingForm.state).toEqual(expectedStates[idx]);
    });
  });

  test('updates state when input values change and user update is successful', async () => {
    SettingForm();

    const mockResponse = {
      user: {
        username: 'hwan2',
        bio: 'test',
        email: 'test_email',
        image: 'test_image',
      },
    };

    const settingData = {
      username: 'hwan',
      bio: 'test',
      email: 'test@test.com',
      image: 'test_image',
    };

    fetch.mockResponse(JSON.stringify(mockResponse));
    const expectedData = mockResponse;

    const actualData = await auth_request.userUpdate(settingData);
    expect(actualData).toEqual(expectedData);
  });
});
