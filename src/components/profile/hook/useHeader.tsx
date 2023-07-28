import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { asyncUserAtom } from '../../../lib/jotai/async-atom';

function useProfileHeader() {
  const [user] = useAtom(asyncUserAtom);
  const navigate = useNavigate();

  const handleSettingClick = () => {
    return navigate('/setting');
  };

  return {
    handleSettingClick,
    user,
  };
}
export default useProfileHeader;
