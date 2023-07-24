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
  const [disabled, setDisAbled] = useState(data.favorited);

  const [, favoriteCount] = useAtom(asyncFavoriteAtom);
  const [, cancelCount] = useAtom(asyncCancelAtom);

  const handleClick = (slug: string) => {
    history(`/article/${slug}`);
  };

  const handleFavoriteClick = async (slug: string) => {
    try {
      if (!disabled) {
        setCount((prev: number) => prev + 1);
        await favoriteCount(slug);
        setDisAbled(true);
      }
      if (!!disabled) {
        setCount((prev: number) => prev - 1);
        await cancelCount(slug);
        setDisAbled(false);
      }
    } catch (err) {
      console.error(err);
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
