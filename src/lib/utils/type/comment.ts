import { Author } from './article';
import React from 'react';

export type PropsCommnet = {
  author: Author;
  body: string;
  createdAt: string;
  id: number;
  updatedAt: string;
};

export type PropsComments = {
  comments?: PropsCommnet[];
};

export type Slug = {
  slug: string;
};

export type PropsCommentsList = {
  handleSubmit?: (e: React.FormEvent) => void;
  commentList: PropsCommnet[] | any;
};

export type ImageAndTextData = {
  imageElement?: string;
  text: { body: string };
  setBody: (e: { body: string }) => void;
};
