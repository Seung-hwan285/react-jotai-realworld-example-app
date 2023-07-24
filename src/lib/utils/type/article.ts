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

export type PropsData = {
  slug?: string;
  data: Props;
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

type newArticle = {
  title: string;
  description: string;
  body: string;
  tags: string[];
};

export type Tag = {
  tag?: string;
};

export type PropsFeed = {
  feed: string;
  onClick: (e: string) => void;
};

export type PropsTag = {
  tags?: string[];
};

export type PropsLoading = {
  loading: boolean;
  user: AuthUser;
};

export type PropsArray = PropsWithArticles;
export type BodyTags = PropsTag;
export type NewArticle = newArticle;
