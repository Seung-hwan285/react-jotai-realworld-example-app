import React from 'react';

type InputField = {
  type: string;
  placeholder: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent) => void;
};

function InputField({
  type,
  placeholder,
  name,
  value,
  onChange,
  onKeyPress,
}: InputField) {
  return (
    <fieldset className="form-group">
      <input
        className="form-control form-control-lg"
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </fieldset>
  );
}
export default InputField;
