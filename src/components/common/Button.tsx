import React from 'react';

type PropsButton = {
  onClick?: (e: React.MouseEvent | string) => void;
  className: string;
  children?: React.ReactNode;
};

function Button({ onClick, className, children }: PropsButton) {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}
export default Button;
