import { useMutation } from "@apollo/client";
import { Recovery } from "components/_Pages/Recovery/Forms/Recovery";
import Header from "components/Header/Header";
import PasswordInput from "components/PasswordInput";
import { useModal } from "context/modal/modal.provider";
import { gqlUser } from "gql";
import { IChangePasswordInput } from "gql/User/mutations";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "rsuite";
import { IUser } from "types/User.types";

const Recover = () => {
  const { openModal } = useModal();
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm();

  const { tkn, userId } = router.query as { tkn: string; userId: string };
  const [completed, setCompleted] = useState<boolean>(false);
  const [doResetPassword, { loading: recoveryLoading, error: loginError }] =
    useMutation<
      { doResetPassword: IUser },
      { changePasswordInput: IChangePasswordInput }
    >(gqlUser.mutations.DO_RESET_PASSWORD, {
      onCompleted() {
        setCompleted(true);
      },
      onError() {},
    });

  const handleResetPassword = (data) => {
    try {
      doResetPassword({
        variables: {
          changePasswordInput: {
            passwordRecoveryToken: tkn,
            userId,
            password: data.password,
          },
        },
      });
    } catch (e) {
      console.error("🚀 ~ file: Login.tsx ~ line 64 ~ handleLogin ~ e", e);
    }
  };

  const handleLogin = () => {
    openModal({
      modalComponent: <Recovery />,
      size: "sm",
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 w-screen h-screen flex flex-col justify-center p-5">
      {!completed && (
        <div className="mx-auto">
          <Header
            {...{
              title: "Actualizar contraseña",
              description: "Ingresa tu nueva contraseña",
            }}
          />

          <form onSubmit={handleSubmit(handleResetPassword)} className="w-full">
            <label className="font-bold">Ingresa tu nueva contraseña</label>
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              defaultValue=""
              render={({ field }) => (
                <PasswordInput
                  {...field}
                  className="mt-2"
                  placeholder="Ingresa aquí tu nueva contraseña"
                />
              )}
            />
            {errors && errors.email && (
              <small className="w-full text-red-500">
                Debes ingresar una contraseña
              </small>
            )}

            <label className="font-bold">Repite tu contraseña</label>
            <Controller
              name="password_repeat"
              control={control}
              rules={{
                required: true,
                validate: (value) =>
                  value === getValues("password") ||
                  "Las contraseñas no coinciden",
              }}
              defaultValue=""
              render={({ field }) => (
                <PasswordInput
                  {...field}
                  className="mt-2"
                  placeholder="Repite tu nueva contraseña"
                />
              )}
            />
            {errors && errors.password_repeat && (
              <small className="w-full text-red-500 v">
                {errors.password_repeat.type === "required"
                  ? "Debes ingresar una contraseña"
                  : errors.password_repeat.message}
              </small>
            )}

            <Button
              appearance="primary"
              className="mt-5 w-full rs-btn-big"
              loading={recoveryLoading}
              type="submit"
            >
              Actualizar contraseña
            </Button>
            {!Object.keys(errors) && loginError && (
              <p className="w-full text-red-500 text-right mt-4">
                {loginError.message}
              </p>
            )}
          </form>
        </div>
      )}
      {completed && (
        <div className="mx-auto">
          <Header
            {...{
              title: "Contraseña actualizada",
              description: "Ahora puedes iniciar sesión con tus nuevos datos",
            }}
          />
          <Button
            appearance="primary"
            size="lg"
            onClick={handleLogin}
            className="w-full"
          >
            Iniciar sesión
          </Button>
        </div>
      )}
    </div>
  );
};
export default Recover;
