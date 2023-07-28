import React, { useEffect, useState } from 'react';
import { getLocalStroage } from '../../../lib/utils/storage';
import { useAtom } from 'jotai';
import { readOnlyAtom, readOnlySlugAtom } from '../../../lib/jotai/user';
import { commentList } from '../../../lib/jotai/comment';
import { CommentAPI } from '../../../lib/utils/request/comment';
import { Comments, PropsCommnet } from '../../../lib/utils/type/comment';

function useCommentList() {
  const [iconClass, setIconClass] = useState('');
  const token = getLocalStroage('token');
  const [slugAtom] = useAtom(readOnlySlugAtom);
  const [comments, setComments] = useAtom(commentList);
  const [username] = useAtom(readOnlyAtom);

  const handleClick = async (id: number) => {
    try {
      const { slug }: any = slugAtom;
      await CommentAPI.deleteComment(slug, id);

      setComments((prev: Comments) => ({
        comments: prev.comments.filter(
          (comment: PropsCommnet) => comment.id !== id,
        ),
      }));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    const icon = token ? 'ion-trash-a' : '';
    setIconClass(icon);
  }, []);

  return {
    username,
    iconClass,
    token,
    slugAtom,
    comments,
    handleClick,
  };
}
export default useCommentList;
