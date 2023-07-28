import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { PropsArticle } from '../../../lib/utils/type/article';
import { useAtom } from 'jotai';
import { commentList } from '../../../lib/jotai/comment';
import { userImage, userSlug } from '../../../lib/jotai/user';
import { bodyAtom } from '../../../lib/jotai/article';
import { CommentAPI } from '../../../lib/utils/request/comment';
import { Comments } from '../../../lib/utils/type/comment';
import { ArticlesAPI } from '../../../lib/utils/request/articles';

function useSingleInfo() {
  const location = useLocation();
  const [single, setSingle] = useState<PropsArticle>({});

  const [, setComments] = useAtom(commentList);

  const [, setUserImage] = useAtom(userImage);
  const [slugAtom, setSlug] = useAtom(userSlug);

  const [textBodyAtom, setBody] = useAtom(bodyAtom);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { slug } = slugAtom;
      const { body } = textBodyAtom;
      const { data } = await CommentAPI.createComment(slug, body);
      if (data) {
        setComments(({ comments }: Comments) => ({
          comments: [...comments, data.comment],
        }));

        setBody({ body: '' });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const pathname = location.pathname;
    const pathnameParms = pathname.split('/');
    const slugname = pathnameParms[2];

    const item = {
      slug: slugname,
    };

    setSlug(item);

    const fetchArticleAndComment = async () => {
      try {
        const [articleResponse, commentsResponse] = await Promise.all([
          ArticlesAPI.getSingleArticle(slugname),
          ArticlesAPI.getCommentsFromArticle(slugname),
        ]);

        setSingle(articleResponse.data);
        setUserImage(articleResponse.data.article.author.image);
        setComments(commentsResponse.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchArticleAndComment();
  }, [location]);

  return {
    single,
    handleSubmit,
  };
}
export default useSingleInfo;
