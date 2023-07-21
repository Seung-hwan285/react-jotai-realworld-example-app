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
import { PropsCommnet } from '../../lib/utils/type/comment';

function SingleInfo() {
  const location = useLocation();
  const [single, setSingle] = useState<PropsArticle>({});
  const [comments, setComments] = useState<{ comments: PropsCommnet[] }>({
    comments: [],
  });

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
        setComments((prevComments) => ({
          comments: [...prevComments.comments, data.comment],
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

    const fetchSingle = async () => {
      const { data } = await ArticlesAPI.getSingleArticle(slugname);
      setSingle(data);
      setUserImage(data.article.author.image);
    };

    const fetchComments = async () => {
      const { data: commentsData } = await ArticlesAPI.getCommentsFromArticle(
        slugname,
      );
      setComments(commentsData);
    };

    fetchSingle();
    fetchComments();
  }, [location]);

  return (
    <>
      {!!single.article ? (
        <div className="article-page">
          <SingleBanner article={single.article} />
          <div className="container page">
            <SingleBody article={single.article} />
            <hr />
            <SingleComment handleSubmit={handleSubmit} commentList={comments} />
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}
export default SingleInfo;
