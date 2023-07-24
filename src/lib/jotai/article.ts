import { atom } from 'jotai';
import { ArticleInput, Body } from '../utils/type/article';

export const bodyAtom = atom<Body>({
  body: '',
});

export const newArticleAtom = atom<ArticleInput>({
  title: '',
  description: '',
  body: '',
});
