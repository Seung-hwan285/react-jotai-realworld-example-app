import React, { useEffect, useState } from 'react';
import { getLocalStroage } from '../../../lib/utils/storage';
import { useAtom } from 'jotai';
import { readOnlySlug } from '../../../lib/jotai/user';
import { commentList } from '../../../lib/jotai/comment';
import { CommentAPI } from '../../../lib/utils/request/comment';
import { Comments, PropsCommnet } from '../../../lib/utils/type/comment';

function useCommentList() {
  const [iconClass, setIconClass] = useState<React.ReactNode>(null);
  const token = getLocalStroage('token');
  const [slugAtom] = useAtom(readOnlySlug);
  const [comments, setComments] = useAtom(commentList);

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
    const icon = token ? <i data-set="${id}" className="ion-trash-a" /> : '';
    setIconClass(icon);
  }, []);

  return {
    iconClass,
    token,
    slugAtom,
    comments,
    handleClick,
  };
}
export default useCommentList;
