import { atom } from 'jotai';
import { AuthUser, Login, Register } from '../utils/type/auth';

export const userRegisterStateAtom = atom<Register>({
  username: '',
  email: '',
  password: '',
});

export const userLoginStateAtom = atom<Login>({
  email: '',
  password: '',
});

export const userState = atom<AuthUser>({
  user: {
    username: '',
    image: '',
    bio: '',
    email: '',
    token: '',
  },
});

export const readOnlyAtom = atom((get) => get(userState).user.username);
