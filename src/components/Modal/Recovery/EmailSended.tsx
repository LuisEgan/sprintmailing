import React from "react";
import Header from "components/Header/Header";

interface EmailSendedProps {
  email: string;
  name: string;
}
export const EmailSended = (props: EmailSendedProps) => {
  const { email, name } = props;
  return (
    <div className="w-full p-5">
      <Header
        {...{
          title: `¡${name} Te hemos enviado un e-mail!`,
          description: `Hemos enviado un correo electrónico a ${email} con un enlace para recuperar tu contraseña`,
        }}
      />
    </div>
  );
};
