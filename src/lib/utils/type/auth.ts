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
  user: Login;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => Promise<void>;
};

export type UserRegisterData = {
  user: Register;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => Promise<void>;
};

export type PropsAuthNavbar = {
  username?: string;
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
