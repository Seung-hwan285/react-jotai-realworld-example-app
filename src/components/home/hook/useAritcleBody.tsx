import { useAtom } from 'jotai';
import { asyncArticleAtom } from '../../../lib/jotai/async-atom';
import { useLocation } from 'react-router-dom';
import { articleFeedAtom } from '../../../lib/jotai/article';
import { useEffect } from 'react';

function useArticleBody() {
  const [data, refreshArticle] = useAtom(asyncArticleAtom);

  const location = useLocation();

  const [feed] = useAtom(articleFeedAtom);

  useEffect(() => {
    refreshArticle();
  }, [location.pathname]);

  const mockList = Array.from({ length: 20 }, (val, idx) => idx + 1);

  return {
    mockList,
    data,
    feed,
  };
}
export default useArticleBody;
