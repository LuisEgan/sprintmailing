import { useMutation } from "@apollo/client";
import { useModal } from "context/modal/modal.provider";
import { gqlUser } from "gql";
import React from "react";
import { Button, Input } from "rsuite";
import { useForm, Controller } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import Header from "components/Header/Header";
import { IUser } from "utils/Types/User.types";
import { IChangePasswordRequestInput } from "gql/User/mutations";
import { EmailSended } from "./EmailSended";

export const Recovery = () => {
  const {
    handleSubmit: handleLoginSubmit,
    control: loginControl,
    formState: { errors },
  } = useForm();

  const { closeModal, openModal } = useModal();

  const [
    changePassword,
    { loading: recoveryLoading, error: loginError },
  ] = useMutation<
    { changePassword: IUser },
    { changePasswordRequestInput: IChangePasswordRequestInput }
  >(gqlUser.mutations.CHANGE_PASSWORD, {
    onCompleted({ changePassword }) {
      openModal({
        modalComponent: <EmailSended {...changePassword} />,
        modalSize: "sm",
      });
    },
    onError() {},
  });

  const handleRecovery = (data) => {
    try {
      changePassword({
        variables: {
          changePasswordRequestInput: {
            email: data.email,
          },
        },
      });
    } catch (e) {
      console.error("🚀 ~ file: Login.tsx ~ line 64 ~ handleLogin ~ e", e);
    }
  };

  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <div className="w-full p-5">
      <Header {...{ title: "Recuperar contraseña", description: "" }} />
      <form onSubmit={handleLoginSubmit(handleRecovery)}>
        <label className="font-bold">Ingresa tu correo</label>

        <Controller
          name="email"
          control={loginControl}
          rules={{ required: true, validate: (value) => isEmail(value) }}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              className="mt-2"
              placeholder="Ingresa aquí tu nombre"
            />
          )}
        />
        {errors && errors.email && (
          <small className="w-full text-red-500">
            Debes ingresar un e-mail válido
          </small>
        )}

        <div className="flex justify-end mt-4">
          <Button
            appearance="default"
            style={{ width: 150 }}
            onClick={handleCloseModal}
            className="rs-btn-big"
          >
            Cancelar
          </Button>
          <Button
            appearance="primary"
            style={{ width: 150 }}
            className="ml-2 rs-btn-big"
            loading={recoveryLoading}
            type="submit"
          >
            Acceder
          </Button>
        </div>
        {loginError && (
          <p className="w-full text-red-500 text-right mt-4">
            {loginError.message}
          </p>
        )}
      </form>
    </div>
  );
};
