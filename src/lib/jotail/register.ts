import { atom } from 'jotai';

export const userStateAtom = atom({
  username: '',
  email: '',
  password: '',
});
