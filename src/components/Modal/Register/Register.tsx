import { useLazyQuery, useMutation } from "@apollo/client";
import Header from "components/Header/Header";
import PasswordInput from "components/PasswordInput";
import { useModal } from "context/modal/modal.provider";
import { gqlUser } from "gql";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Input } from "rsuite";
import {
  AFTER_LOGIN_REDIRECT,
  REFRESH_TOKEN_PERSIST,
  USER_TOKEN_PERSIST,
} from "settings/constants";
import isEmail from "validator/lib/isEmail";

export const Register = () => {
  const {
    handleSubmit: handleRegisterSubmit,
    control: registerControl,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { closeModal } = useModal();

  const [getUser, { data: getUserData, loading: getUserLoading }] =
    useLazyQuery(gqlUser.queries.GET_USER);

  const [signup, { loading: signupLoading, error: signupError }] = useMutation(
    gqlUser.mutations.SIGNUP,
    {
      onCompleted({ signup }) {
        const { accessToken, refreshToken } = signup;
        localStorage.setItem(USER_TOKEN_PERSIST, `${accessToken}`);
        localStorage.setItem(REFRESH_TOKEN_PERSIST, `${refreshToken}`);
        getUser({
          variables: {
            accessToken,
          },
        });
      },
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
  }, [getUserData]);

  const handleRegister = async (data) => {
    if (typeof window !== "undefined") {
      try {
        await signup({
          variables: {
            signUpInput: {
              ...data,
            },
          },
        });
      } catch (error) {
        console.error(
          "🚀 ~ file: Register.tsx ~ line 62 ~ handleRegister ~ error",
          error,
        );
      }
    }
  };

  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <div className="p-5 w-full">
      <Header {...{ title: "Regístrate", description: "" }} />
      <form onSubmit={handleRegisterSubmit(handleRegister)}>
        <label className="font-bold" htmlFor="name">
          ¿Cuál es tu nombre?
        </label>

        <Controller
          name="name"
          defaultValue=""
          control={registerControl}
          rules={{ required: true }}
          render={({ field }) => (
            <Input {...field} placeholder="Ingresa aquí tu nombre" />
          )}
        />
        {errors && errors.name && (
          <small className="w-full text-red-500">
            Debes ingresar tu nombre
          </small>
        )}
        <label className="font-bold mt-2 block"> ¿Cuál es tu apellido?</label>
        <Controller
          name="lastname"
          defaultValue=""
          control={registerControl}
          rules={{ required: true }}
          render={({ field }) => (
            <Input {...field} placeholder="Ingresa aquí tus apellidos" />
          )}
        />
        {errors && errors.lastname && (
          <small className="w-full text-red-500">
            Debes ingresar tu apellido
          </small>
        )}

        <label className="font-bold mt-2 block">¿Cuál es tu e-mail?</label>

        <Controller
          name="email"
          defaultValue=""
          control={registerControl}
          rules={{ required: true, validate: (value) => isEmail(value) }}
          render={({ field }) => (
            <Input
              {...field}
              type="email"
              placeholder="Ingresa aquí tu correo eletrónico"
            />
          )}
        />
        {errors && errors.email && (
          <small className="w-full text-red-500">
            Debes ingresar un e-mail válido
          </small>
        )}

        <label className="font-bold mt-2 block">Ingresa tu contraseña</label>

        <Controller
          name="password"
          defaultValue=""
          control={registerControl}
          rules={{ required: true }}
          render={({ field }) => (
            <PasswordInput
              {...field}
              placeholder="Ingresa aquí tu contraseña"
            />
          )}
        />
        {errors && errors.password && (
          <small className="w-full text-red-500">
            Debes ingresar una contraseña (Al menos 1 dígito y 1 número)
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
            <span className="text-red-500">Cancelar</span>
          </Button>
          <Button
            appearance="primary"
            style={{ width: 150 }}
            className="ml-2 rs-btn-big"
            type="submit"
            loading={signupLoading || getUserLoading}
          >
            Acceder
          </Button>
        </div>
        {signupError && (
          <p className="w-full text-red-500 text-right mt-4">
            {signupError.message}
          </p>
        )}
      </form>
    </div>
  );
};
