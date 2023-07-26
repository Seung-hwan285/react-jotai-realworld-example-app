import React from 'react';

type PropsButton = {
  disabled?: boolean;
  onClick?: (e: React.MouseEvent | string) => void;
  className: string;
  children?: React.ReactNode;
};

function Button({ disabled, onClick, className, children }: PropsButton) {
  const disable = disabled === null || disabled;

  return (
    <button disabled={disable} onClick={onClick} className={className}>
      {children}
    </button>
  );
}
export default Button;
