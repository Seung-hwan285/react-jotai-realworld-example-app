export type Author = {
  bio: string;
  following: boolean;
  image: string;
  username: string;
};

type Props = {
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

export type PropsArray = PropsWithArticles;
