import React, { forwardRef } from "react";
import Input, { InputProps } from "rsuite/lib/Input/Input";
import { CSSProperties } from "styled-components";

interface ITextInput extends InputProps {
  label?: string;
  inputClassName?: string;
  inputStyle?: CSSProperties;
  inputProps?: InputProps;
  error?: string;
}

// eslint-disable-next-line react/display-name
const TextInput = forwardRef<HTMLDivElement, ITextInput>(
  (props: ITextInput, ref) => {
    const {
      label,
      className,
      style,
      error,
      inputClassName,
      inputStyle,
      ...inputProps
    } = props;

    return (
      <div {...{ className, style, ref }}>
        <div className="font-bold ml-1 mb-2">{label}</div>
        <Input {...inputProps} className={inputClassName} style={inputStyle} />
        {error && <small className="w-full text-red-500">{error}</small>}
      </div>
    );
  },
);

export default TextInput;
