import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Register, UserRegisterData } from '../../../lib/utils/type/auth';
import { authAPI } from '../../../lib/utils/request/auth';
import { userRegisterStateAtom } from '../../../lib/jotail/user';

function useRegister() {
  const [user, setUser] = useAtom(userRegisterStateAtom);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev: Register) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { username, email, password } = user;
    try {
      await authAPI.register(username, email, password);
      return navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return {
    user,
    handleChange,
    handleSubmit,
  } as UserRegisterData;
}
export default useRegister;
