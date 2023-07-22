import { atom } from 'jotai';
import { Comments } from '../utils/type/comment';

export const commentList = atom<Comments>({
  comments: [],
});
