import React from 'react';
import { PropsButton } from '../../lib/utils/type/auth';

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
