import { atom } from 'jotai';
import { AuthUser, Image, Login, Register, Setting } from '../utils/type/auth';
import { Slug } from '../utils/type/comment';

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

export const userSettingState = atom<Setting>({
  email: '',
  password: '',
  username: '',
  bio: '',
  images: '',
});

export const userImage = atom<Image>({
  image: '',
});

export const userSlug = atom<Slug>({
  slug: '',
});

export const readOnlyAtom = atom((get) => get(userState).user.username);
export const readOnlyImageAtom = atom((get) => get(userImage));
export const readOnlySlugAtom = atom((get) => get(userSlug).slug);
