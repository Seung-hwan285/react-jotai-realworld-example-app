import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import React, { startTransition, useState } from 'react';
import { Login, UserLoginData } from '../../../lib/utils/type/auth';
import { AuthAPI } from '../../../lib/utils/request/auth';
import { userLoginStateAtom } from '../../../lib/jotai/user';

function useLogin() {
  const [user, setUser] = useAtom(userLoginStateAtom);

  const [errorEmail, setErrorEmail] = useState('');

  const navigate = useNavigate();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'email') {
      if (!isValidEmail(value) && value.length !== 0) {
        setErrorEmail('Please respect the email format');
      } else {
        setErrorEmail('');
      }
    }

    startTransition(() => {
      setUser((prev: Login) => ({
        ...prev,
        [name]: value,
      }));
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = user;

    const data = await AuthAPI.login(email, password);

    if (!data) {
      return;
    }

    return navigate('/');
  };

  return {
    errorEmail,
    user,
    handleChange,
    handleSubmit,
  } as UserLoginData;
}
export default useLogin;
