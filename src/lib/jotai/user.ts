import { atom } from 'jotai';
import { AuthUser, Image, Login, Register } from '../utils/type/auth';
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

export const userImage = atom<Image>({
  image: '',
});

export const userSlug = atom<Slug>({
  slug: '',
});

export const readOnlyAtom = atom((get) => get(userState).user.username);
export const readOnlyAuthImageAtom = atom((get) => get(userState).user.image);
export const readOnlyImageAtom = atom((get) => get(userImage));
export const readOnlySlug = atom((get) => get(userSlug).slug);
