import { atom } from 'jotai';
type Body = {
  body: string;
};

export const bodyAtom = atom<Body>({
  body: '',
});

export const readOnlyBody = atom((get) => get(bodyAtom));
