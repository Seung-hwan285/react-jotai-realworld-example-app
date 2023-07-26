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

export type UserLoginData = {
  errorEmail?: string;
  user: Login;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => Promise<void>;
};

export type UserRegisterData = {
  errorEmail?: string;
  user: Register;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => Promise<void>;
};

export type PropsAuthNavbar = {
  user?: AuthUser;
  onClick?: (e: React.MouseEvent) => void;
  isActiveLink: (e: string) => boolean;
};

export type Image = {
  image: string;
};

export type AuthUser = {
  user: {
    username: '';
    image: '';
    bio: '';
    email: '';
    token: '';
  };
};

export type Error = {
  error: string;
};

export type Setting = {
  username?: string;
  bio?: string;
  email?: string;
  password?: string;
  images?: string;
};
