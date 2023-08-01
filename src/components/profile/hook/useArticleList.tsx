import { useState } from 'react';
import { useAtom } from 'jotai';
import {
  asyncCancelAtom,
  asyncFavoriteAtom,
} from '../../../lib/jotai/async-atom';
import { PropsData } from '../../../lib/utils/type/article';

function useArticleList({ data }: PropsData) {
  const [count, setCount] = useState(data.favoritesCount);
  const [disabled, setDisabled] = useState(data.favorited);

  const [, favoriteCount] = useAtom(asyncFavoriteAtom);
  const [, cancelCount] = useAtom(asyncCancelAtom);

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
  };
}
export default useArticleList;
