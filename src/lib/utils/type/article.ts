import { AuthUser } from './auth';

export type Author = {
  bio: string;
  following: boolean;
  image: string;
  username: string;
};

export type PropsArticle = {
  article?: Props;
};

export type Props = {
  author: Author;
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
  updatedAt: string;
};

type PropsWithArticles = {
  articles?: Props[];
};

export type PropsFeed = {
  feed: string;
  onClick: (e: string) => void;
};

export type PropsTag = {
  tagList?: string[];
};

export type PropsLoading = {
  loading: boolean;
  user: AuthUser;
};

export type PropsArray = PropsWithArticles;
