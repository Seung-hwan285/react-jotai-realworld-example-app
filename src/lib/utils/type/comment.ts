import { Author } from './article';
import React from 'react';

export type PropsCommnet = {
  author: Author;
  body: string;
  createdAt: string;
  id: number;
  updatedAt: string;
};

export type Comments = {
  comments: PropsCommnet[];
};

export type Slug = {
  slug: string;
};

export type PropsCommentsList = {
  onSubmit?: (e: React.FormEvent) => void;
};

export type ImageAndTextData = {
  author?: Author;
  imageElement?: string;
  text: { body: string };
  setBody: (e: { body: string }) => void;
};
