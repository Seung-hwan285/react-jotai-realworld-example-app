import { useAtom } from 'jotai';
import { readOnlyAtom } from '../../../lib/jotail/user';
import { useEffect, useState } from 'react';
import { ArticlesAPI } from '../../../lib/utils/request/articles';

function useProfileInfo() {
  const [author] = useAtom(readOnlyAtom);
  const [isPending, setPending] = useState(true);
  const [articles, setArticles] = useState([]);

  const [feed, setFeed] = useState('my');

  const handleFeedClick = (feed: string) => {
    setPending(true);
    if (feed === 'my') {
      setFeed('my');
    }
    if (feed === 'favorite') {
      setFeed('favorite');
    }
  };

  useEffect(() => {
    const fetchArticle = async () => {
      switch (feed) {
        case 'my':
          const { data } = await ArticlesAPI.getUserArticles(author);
          setArticles(data.articles);
          setPending(false);
          break;
        case 'favorite':
          const { data: favorite } = await ArticlesAPI.getFavoriteArticles(
            author,
          );
          setArticles(favorite.articles);
          setPending(false);
          break;
      }
    };
    fetchArticle();
  }, [author, feed]);

  return {
    handleFeedClick,
    isPending,
    articles,
    feed,
  };
}
export default useProfileInfo;
