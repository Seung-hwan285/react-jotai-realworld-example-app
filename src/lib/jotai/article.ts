import { atom } from 'jotai';
import { ArticleInput, Body, Tag } from '../utils/type/article';

export const bodyAtom = atom<Body>({
  body: '',
});

export const newArticleAtom = atom<ArticleInput>({
  title: '',
  description: '',
  body: '',
});

export type FeedAndTag = {
  feed?: string;
  tag?: string;
};

export const articleFeedAtom = atom<FeedAndTag>({
  feed: 'global',
  tag: '',
});
