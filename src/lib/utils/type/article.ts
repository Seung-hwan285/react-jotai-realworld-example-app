import { AuthUser } from './auth';

export type Author = {
  bio?: string;
  following: boolean;
  image: string;
  username: string;
};

export type PropsArticle = Partial<{ article: Props }>;

export type PropsData = Required<{ data: Props }> & {
  slug?: string;
};

export type Props = Required<{ author: Author }> & {
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

type PropsWithArticles = Partial<{ articles: Props[] }>;

type newArticle = {
  title: string;
  description: string;
  body: string;
  tags: string[];
};

export type Tag = Partial<{ tag: string }>;

export type PropsFeed = {
  feed: string;
  onClick: (e: string) => void;
};

export type PropsTag = Partial<{ tags: string[] }>;

export type PropsLoading = Required<{ user: AuthUser }> & {
  loading: boolean;
};

export type Body = {
  body: string;
};

export type ArticleInput = Required<Body> & {
  title: string;
  description: string;
};

export type PropsArray = PropsWithArticles;
export type BodyTags = PropsTag;
export type NewArticle = newArticle;
