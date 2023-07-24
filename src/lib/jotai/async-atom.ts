import { atom } from 'jotai';
import { ArticlesAPI } from '../utils/request/articles';

export const asyncFavoriteAtom = atom(null, async (set, get, slug: string) => {
  const updateAtom = await ArticlesAPI.favorite(slug);
  return updateAtom.data.article.favoritesCount;
});

export const asyncCancelAtom = atom(null, async (set, get, slug: string) => {
  return await ArticlesAPI.cancelFavorite(slug);
});
