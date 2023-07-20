import { useAtom } from 'jotai';
import { userState } from '../../../lib/jotail/user';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../../lib/utils/request/auth';

function useProfileHeader() {
  const [user, setUser] = useAtom(userState);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await authAPI.getUser();
      setUser(data);
      setLoading(false);
    };
    fetchUser();
  }, [setUser]);

  const handleSettingClick = () => {
    return navigate('/setting');
  };

  return {
    handleSettingClick,
    user,
    loading,
  };
}
export default useProfileHeader;
