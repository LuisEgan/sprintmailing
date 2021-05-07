import { useLazyQuery, useMutation } from "@apollo/client";
import { useModal } from "context/modal/modal.provider";
import { gqlUser } from "gql";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Button, Input } from "rsuite";
import { useForm, Controller } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import { AFTER_LOGIN_REDIRECT } from "settings/constants";
import Header from "components/Header/Header";

export const Login = () => {
  const {
    handleSubmit: handleLoginSubmit,
    control: loginControl,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const { closeModal } = useModal();

  const [
    getUser,
    { data: getUserData, loading: getUserLoading },
  ] = useLazyQuery(gqlUser.queries.GET_USER);

  const [login, { loading: loginLoading, error: loginError }] = useMutation(
    gqlUser.queries.LOGIN,
    {
      onCompleted({ login }) {
        const { accessToken } = login;
        localStorage.setItem("userToken", `${accessToken}`);
        getUser({
          variables: {
            accessToken,
          },
        });
      },
      onError() {},
    },
  );

  useEffect(() => {
    if (getUserData) {
      const {
        user: { id: userId },
      } = getUserData;
      localStorage.setItem("userId", `${userId}`);
      closeModal();
      router.push(AFTER_LOGIN_REDIRECT);
    }
  }, [getUserData, router.pathname, closeModal, router]);

  const handleLogin = (data) => {
    try {
      login({
        variables: {
          loginInput: {
            email: data.email,
            password: data.password,
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
      <Header {...{ title: "Bienvenido", description: "" }} />
      <form onSubmit={handleLoginSubmit(handleLogin)}>
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
        <label className="font-bold mt-3 block">Ingresa tu contraseña</label>
        <Controller
          name="password"
          control={loginControl}
          rules={{ required: true }}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              type="password"
              className="mt-2"
              placeholder="Ingresa aquí tu contraseña"
            />
          )}
        />
        {errors && errors.password && (
          <small className="w-full text-red-500">
            Debes ingresar una contraseña
          </small>
        )}
        <div className="flex justify-end mt-3" style={{ color: "#5A27E7" }}>
          ¿Olvidate tu contraseña?
        </div>
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
            loading={loginLoading || getUserLoading}
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
