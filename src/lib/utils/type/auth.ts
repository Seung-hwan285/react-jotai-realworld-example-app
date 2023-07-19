import React from 'react';

export type Register = {
  username: string;
  email: string;
  password: string;
};

export type Login = {
  email: string;
  password: string;
};

type UserData = {
  email: string;
  password: string;
};

export type UserLoginData = {
  user: UserData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => Promise<void>;
};

type RegisterData = {
  username: string;
  email: string;
  password: string;
};

export type UserRegisterData = {
  user: RegisterData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => Promise<void>;
};
