import { useEffect, useState } from 'react';
import { useSetAtom } from 'jotai';
import {
  asyncCancelAtom,
  asyncFavoriteAtom,
} from '../../../lib/jotai/async-atom';
import { PropsData } from '../../../lib/utils/type/article';
import { getLocalStroage } from '../../../lib/utils/storage';

function useHomeArticleList({ data }: PropsData) {
  const [count, setCount] = useState(data.favoritesCount);
  const [disabled, setDisabled] = useState(data.favorited);

  const favoriteCount = useSetAtom(asyncFavoriteAtom);
  const cancelCount = useSetAtom(asyncCancelAtom);

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = getLocalStroage('token');
    const isLoggedIn = token === null;
    setIsAuth(isLoggedIn);
  }, []);

  useEffect(() => {
    setDisabled(data.favorited);
    setCount(data.favoritesCount);
  }, [data]);

  const handleFavoriteClick = async (slug: string) => {
    if (!disabled) {
      setDisabled(true);
      setCount((prev: number) => prev + 1);
      await favoriteCount(slug);
    }

    if (!!disabled) {
      setDisabled(false);
      setCount((prev: number) => prev - 1);
      await cancelCount(slug);
    }
  };

  return {
    isAuth,
    count,
    disabled,
    handleFavoriteClick,
  };
}
export default useHomeArticleList;
