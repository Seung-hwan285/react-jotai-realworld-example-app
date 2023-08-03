import { AuthUser } from './auth';

export type Author = {
  bio?: string;
  following: boolean;
  image: string;
  username: string;
};

export type PropsArticle = { article?: Props };

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

type PropsWithArticles = { articles?: Props[] };

type newArticle = {
  title: string;
  description: string;
  body: string;
  tags?: string[];
};

export type Tag = { tagItem?: string };

export type PropsFeed = {
  feed: string;
  onClick: (e: string) => void;
};

export type PropsTag = {
  tags?: string[];
  handleDeleteClick?: (e: string | any) => void;
};

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

export type Pagination = {
  list: number[];
};

export type PropsArray = PropsWithArticles;
export type BodyTags = PropsTag;
export type NewArticle = newArticle;
export type UpdateArticle = newArticle;
