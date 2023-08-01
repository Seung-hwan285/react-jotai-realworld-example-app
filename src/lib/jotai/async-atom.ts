import { atom, Getter } from 'jotai';
import { ArticlesAPI } from '../utils/request/articles';
import { articleFeedAtom, articleOffsetAtom, FeedAndTag } from './article';
import { AuthAPI } from '../utils/request/auth';
import { readOnlyAtom } from './user';
import { isResponseObeject } from '../utils/type-guard/data';
import { AuthUser } from '../utils/type/auth';

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

export const asyncUserAtom = atom(async () => {
  const { data } = await AuthAPI.getUser();
  if (!isResponseObeject<AuthUser>(data)) return false;

  const { user }: any = data;
  return user;
});

export const atomWithRefresh = <T>(fn: (get: Getter) => T) => {
  const refreshCounter = atom(0);
  return atom(
    (get) => {
      get(refreshCounter);
      return fn(get);
    },
    (_, set) => set(refreshCounter, (i) => i + 1),
  );
};

export const asyncArticleAtom = atomWithRefresh(async (get) => {
  const feedAtom: FeedAndTag = get(articleFeedAtom);
  const pageAtom = get(articleOffsetAtom);
  const authorAtom = get(readOnlyAtom);

  const feed = feedAtom.tag === '' ? feedAtom.feed : '';
  const tag = feedAtom.feed === '' ? feedAtom.tag : '';

  switch (feed) {
    case 'global':
      const { data } = await ArticlesAPI.getAllArticle((pageAtom - 1) * 5);
      return data.articles;
    case '':
      const { data: tagArticles } = await ArticlesAPI.getTagArticles(tag);
      return tagArticles.articles;
    case 'your':
      const { data: myArticle } = await ArticlesAPI.getUserArticles(authorAtom);
      return myArticle.article;
    default:
      break;
  }
});
