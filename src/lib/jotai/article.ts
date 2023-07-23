import { atom } from 'jotai';
export type Body = {
  body: string;
};

export type NewArticle = {
  title: string;
  description: string;
  body: string;
};

export const bodyAtom = atom<Body>({
  body: '',
});

export const newArticleAtom = atom<NewArticle>({
  title: '',
  description: '',
  body: '',
});

export const readOnlyBody = atom((get) => get(bodyAtom));
