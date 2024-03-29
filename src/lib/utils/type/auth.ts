import React from 'react';

export type OptionalUtils<T> = {
  [K in keyof T]?: T[K];
};

export type Register = {
  username: string;
  email: string;
  password: string;
};

export type Login = {
  email: string;
  password: string;
};

type InitUser<T> = {
  errorEmail?: string;
  user: T;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => Promise<void>;
};

export type UserLoginData = InitUser<Login>;
export type UserRegisterData = InitUser<Register>;

export type PropsAuthNavbar = {
  user?: AuthUser;
  onClick?: (e: React.MouseEvent) => void;
  isActiveLink: (e: string) => boolean;
};

export type Image = {
  image: string;
};

export type AuthUser = {
  user: OptionalUtils<{
    username: '';
    image: '';
    bio: '';
    email: '';
    token: '';
  }>;
};

export type Error = {
  error: string;
};

export type Setting = OptionalUtils<{
  username: string;
  bio: string;
  email: string;
  password: string;
  images: string;
}>;

export type PropsButton = {
  disabled?: boolean;
  onClick?: (
    e: React.FormEvent<HTMLButtonElement> | React.MouseEvent<HTMLInputElement>,
  ) => void;
  className: string;
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
};

export type PropsInputField = {
  type: string;
  placeholder: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent) => void;
};
