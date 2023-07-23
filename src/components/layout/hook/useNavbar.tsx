import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getLocalStroage, removeStorage } from '../../../lib/utils/storage';
import { authAPI } from '../../../lib/utils/request/auth';
import { useAtom } from 'jotai';
import { userState } from '../../../lib/jotai/user';

function useNavBar() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const [user, setUser] = useState({});
  const [user, setUser] = useAtom(userState);

  const isActiveLink = (path: string) => {
    const { pathname } = location;
    return pathname === path;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    removeStorage();
  };

  useEffect(() => {
    const token = getLocalStroage('token');
    const isLogged = token !== null;

    if (isLogged) {
      const fetchUser = async () => {
        const { data } = await authAPI.getUser();
        setUser(data);
      };
      fetchUser();
    }

    setIsLoggedIn(isLogged);
  }, [location.pathname]);

  return {
    isLoggedIn,
    isActiveLink,
    handleLogout,
    user,
  };
}
export default useNavBar;
