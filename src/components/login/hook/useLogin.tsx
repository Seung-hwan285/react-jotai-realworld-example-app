import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Login, UserLoginData } from '../../../lib/utils/type/auth';
import { authAPI } from '../../../lib/utils/request/auth';
import { userLoginStateAtom } from '../../../lib/jotai/user';

function useLogin() {
  const [user, setUser] = useAtom(userLoginStateAtom);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev: Login) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = user;
    const data = await authAPI.login(email, password);

    if (data) {
      return navigate('/');
    }
  };

  return {
    user,
    handleChange,
    handleSubmit,
  } as UserLoginData;
}
export default useLogin;
