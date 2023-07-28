import { useAtom } from 'jotai';
import { readOnlyAtom } from '../../../lib/jotai/user';
import { useNavigate } from 'react-router-dom';
import { ArticlesAPI } from '../../../lib/utils/request/articles';

function useSingleBanner() {
  const [userAtom] = useAtom(readOnlyAtom);

  const history = useNavigate();

  const handleClick = async (slug: string) => {
    try {
      await ArticlesAPI.deleteArticle(slug);
      history('/');
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = (slug: string) => {
    history(`/edit/${slug}`);
  };

  return {
    handleEditClick,
    userAtom,
    handleClick,
  };
}
export default useSingleBanner;
