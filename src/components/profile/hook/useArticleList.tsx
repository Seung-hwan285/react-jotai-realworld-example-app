import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAtom } from 'jotai';
import {
  asyncCancelAtom,
  asyncFavoriteAtom,
} from '../../../lib/jotai/async-atom';
import { PropsData } from '../../../lib/utils/type/article';

function useArticleList({ data }: PropsData) {
  const history = useNavigate();

  const [count, setCount] = useState(data.favoritesCount);
  const [disabled, setDisabled] = useState(data.favorited);

  const [, favoriteCount] = useAtom(asyncFavoriteAtom);
  const [, cancelCount] = useAtom(asyncCancelAtom);

  const handleClick = (slug: string) => {
    history(`/article/${slug}`);
  };

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
    count,
    disabled,
    handleFavoriteClick,
    handleClick,
  };
}
export default useArticleList;
