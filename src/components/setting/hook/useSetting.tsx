import { useNavigate } from 'react-router-dom';
import React, { startTransition, useState } from 'react';
import { Error, Setting } from '../../../lib/utils/type/auth';
import { useAtom } from 'jotai';
import { userSettingState } from '../../../lib/jotai/user';
import { removeStorage } from '../../../lib/utils/storage';
import { ArticlesAPI } from '../../../lib/utils/request/articles';
import { AuthAPI } from '../../../lib/utils/request/auth';

function useSetting() {
  const navigate = useNavigate();
  const [error, setError] = useState<Error>({ error: '' });

  const [state, setState] = useAtom(userSettingState);
  const [errorEmail, setErrorEmail] = useState('');

  const [disabled, setDisabled] = useState(true);

  const handleLogout = () => {
    removeStorage();

    return navigate('/');
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === 'email') {
      if (!isValidEmail(value) && value.length !== 0) {
        setErrorEmail('Please respect the email format');
      } else {
        setErrorEmail('');
      }
    }

    if (state.bio || state.username || state.images) {
      setDisabled(true);
      setError((prev: Error) => ({
        ...prev,
        error: 'Only the email password can be changed.',
      }));
    } else {
      setDisabled(false);
      setError((prev: Error) => ({
        ...prev,
        error: '',
      }));
    }

    startTransition(() => {
      setState((prev: Setting) => ({
        ...prev,
        [name]: value,
      }));
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const bodyData = {
      email: state.email,
      password: state.password,
    };

    const data = await AuthAPI.updateUser(bodyData);

    if (data) {
      return navigate('/');
    }
  };

  return {
    error,
    handleSubmit,
    handleChange,
    state,
    errorEmail,
    disabled,
    handleLogout,
  };
}
export default useSetting;
