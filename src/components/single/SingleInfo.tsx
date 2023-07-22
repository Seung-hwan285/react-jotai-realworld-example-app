import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArticlesAPI } from '../../lib/utils/request/articles';
import { PropsArticle } from '../../lib/utils/type/article';
import LoadingSpinner from '../common/LoadingSpinner';
import SingleBanner from './SingleBanner';
import SingleBody from './SingleBody';
import { useAtom } from 'jotai';
import { userImage, userSlug } from '../../lib/jotai/user';
import { bodyAtom } from '../../lib/jotai/article';
import SingleComment from './SingleComment';
import { CommentAPI } from '../../lib/utils/request/comment';
import { commentList } from '../../lib/jotai/comment';
import { Comments } from '../../lib/utils/type/comment';

function SingleInfo() {
  const location = useLocation();
  const [single, setSingle] = useState<PropsArticle>({});

  const [comments, setComments] = useAtom(commentList);

  const [image, setUserImage] = useAtom(userImage);
  const [slugAtom, setSlug] = useAtom(userSlug);

  const [textBody, setBody] = useAtom(bodyAtom);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { slug } = slugAtom;
      const { body } = textBody;
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

  return (
    <>
      {!!single.article ? (
        <div className="article-page">
          <SingleBanner article={single.article} />
          <div className="container page">
            <SingleBody article={single.article} />
            <hr />
            <SingleComment handleSubmit={handleSubmit} />
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}
export default SingleInfo;
