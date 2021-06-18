import React, { useState } from "react";
import { Icon, Input, InputGroup, InputProps } from "rsuite";

const PasswordInput = React.forwardRef((props: InputProps) => {
  const [passwordType, setPasswordType] = useState<boolean>(true);

  const handleReveal = () => {
    setPasswordType(!passwordType);
  };
  return (
    <InputGroup inside className="p-0">
      <Input {...props} type={`${passwordType ? "password" : "text"}`} />
      <InputGroup.Addon onClick={handleReveal} className="h-full">
        {passwordType && (
          <Icon className="text-gray-400 m-0  pr-4" icon="eye-slash" />
        )}
        {!passwordType && (
          <Icon className="text-gray-400 m-0  pr-4" icon="eye" />
        )}
      </InputGroup.Addon>
    </InputGroup>
  );
});

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
