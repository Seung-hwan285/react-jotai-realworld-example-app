import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import {
  asyncCancelAtom,
  asyncFavoriteAtom,
} from '../../../lib/jotai/async-atom';
import { PropsData } from '../../../lib/utils/type/article';
import { getLocalStroage } from '../../../lib/utils/storage';

function useHomeArticleList({ data }: PropsData) {
  const history = useNavigate();

  const [count, setCount] = useState(data.favoritesCount);
  const [disabled, setDisAbled] = useState(data.favorited);

  const [, favoriteCount] = useAtom(asyncFavoriteAtom);
  const [, cancelCount] = useAtom(asyncCancelAtom);

  const handleClick = (slug: string) => {
    history(`/article/${slug}`);
  };

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = getLocalStroage('token');

    const isLoggedIn = token === null;

    setIsAuth(isLoggedIn);
  }, []);

  const handleFavoriteClick = async (slug: string) => {
    if (!disabled) {
      setDisAbled(true);
      setCount((prev: number) => prev + 1);
      await favoriteCount(slug);
    }

    if (!!disabled) {
      setDisAbled(false);
      setCount((prev: number) => prev - 1);
      await cancelCount(slug);
    }
  };

  return {
    isAuth,
    count,
    disabled,
    handleFavoriteClick,
    handleClick,
  };
}
export default useHomeArticleList;
