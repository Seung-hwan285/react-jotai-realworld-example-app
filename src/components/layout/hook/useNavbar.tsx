import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getLocalStroage, removeStorage } from '../../../lib/utils/storage';

function useNavBar() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

    setIsLoggedIn(isLogged);
  }, [location.pathname]);

  return {
    isLoggedIn,
    isActiveLink,
    handleLogout,
  };
}
export default useNavBar;
