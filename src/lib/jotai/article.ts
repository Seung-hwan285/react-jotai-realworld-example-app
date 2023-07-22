import { atom } from 'jotai';
export type Body = {
  body: string;
};

export const bodyAtom = atom<Body>({
  body: '',
});

export const readOnlyBody = atom((get) => get(bodyAtom));
