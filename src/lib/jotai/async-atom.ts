import { atom } from 'jotai';
import { ArticlesAPI } from '../utils/request/articles';
import { articleFeedAtom, FeedAndTag } from './article';

export const asyncFavoriteAtom = atom(null, async (set, get, slug: string) => {
  return await ArticlesAPI.favorite(slug);
});

export const asyncCancelAtom = atom(null, async (set, get, slug: string) => {
  return await ArticlesAPI.cancelFavorite(slug);
});

export const asyncTagsAtom = atom(async () => {
  const { data } = await ArticlesAPI.getTag();
  return data;
});

export const refreshAtom = atom(false);

export const asyncArticleAtom = atom(async (get) => {
  get(refreshAtom);

  const feedAtom: FeedAndTag = get(articleFeedAtom);

  const feed = feedAtom.feed && feedAtom.tag === '' ? feedAtom.feed : '';
  const tag = feedAtom.tag && feedAtom.feed === '' ? feedAtom.tag : '';

  switch (feed) {
    case 'global':
      const { data } = await ArticlesAPI.getAllArticle();
      return data.articles;
      break;
    case '':
      const { data: tagArticles } = await ArticlesAPI.getTagArticles(tag);
      return tagArticles.articles;
      break;

    default:
      break;
  }
});
