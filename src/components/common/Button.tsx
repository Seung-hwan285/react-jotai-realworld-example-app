import React from 'react';

type PropsButton = {
  disabled?: boolean;
  onClick?: (
    e: React.FormEvent<HTMLButtonElement> | React.MouseEvent<HTMLInputElement>,
  ) => void;
  className: string;
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
};

function Button({ disabled, onClick, className, children, type }: PropsButton) {
  const disable = disabled === null || disabled;

  return (
    <button
      disabled={disable}
      onClick={onClick}
      className={className}
      type={type}
    >
      {children}
    </button>
  );
}
export default Button;
