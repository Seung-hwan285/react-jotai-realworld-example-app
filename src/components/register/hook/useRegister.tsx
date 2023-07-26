import { useAtom } from 'jotai';
import React, { startTransition, useState } from 'react';
import { Register, UserRegisterData } from '../../../lib/utils/type/auth';
import { AuthAPI } from '../../../lib/utils/request/auth';
import { userRegisterStateAtom } from '../../../lib/jotai/user';

function useRegister() {
  const [user, setUser] = useAtom(userRegisterStateAtom);
  const [errorEmail, setErrorEmail] = useState('');

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
      setUser((prev: Register) => ({
        ...prev,
        [name]: value,
      }));
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { username, email, password } = user;
    try {
      await AuthAPI.register(username, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    errorEmail,
    user,
    handleChange,
    handleSubmit,
  } as UserRegisterData;
}
export default useRegister;
