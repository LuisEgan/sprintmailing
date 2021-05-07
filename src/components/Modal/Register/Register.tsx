import { useLazyQuery, useMutation } from "@apollo/client";
import { useModal } from "context/modal/modal.provider";
import { gqlUser } from "gql";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Button, Col, Input, Row } from "rsuite";
import { useForm, Controller } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import { AFTER_LOGIN_REDIRECT } from "settings/constants";

export const Register = () => {
  const {
    handleSubmit: handleRegisterSubmit,
    control: registerControl,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { closeModal } = useModal();

  const [
    getUser,
    { data: getUserData, loading: getUserLoading },
  ] = useLazyQuery(gqlUser.queries.GET_USER);

  const [signup, { loading: signupLoading, error: signupError }] = useMutation(
    gqlUser.mutations.SIGNUP,
    {
      onCompleted({ signup }) {
        const { accessToken } = signup;
        localStorage.setItem("userToken", `${accessToken}`);
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
  }, [getUserData, router.pathname, closeModal, router]);

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
      <h3
        className="font-bold mt-3"
        style={{ fontSize: "28px", lineHeight: "34px" }}
      >
        Regístrate
      </h3>

      <Row>
        <Col className="animate__animated animate__fadeIn">
          <form onSubmit={handleRegisterSubmit(handleRegister)}>
            <label className="font-bold" htmlFor="name">
              ¿Cómo te llamas?
            </label>

            <Controller
              name="name"
              defaultValue=""
              control={registerControl}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  className="mt-3"
                  placeholder="Ingresa aquí tu nombre"
                />
              )}
            />
            {errors && errors.name && (
              <small className="w-full text-red-500">
                Debes ingresar tu nombre
              </small>
            )}
            <label className="font-bold mt-3 block">
              ¿Cuál son tus apellidos?
            </label>
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

            <label className="font-bold mt-3 block">
              Dinos cuál es tu correo electrónico
            </label>

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

            <label className="font-bold mt-3 block">
              Ingresa tu contraseña
            </label>

            <Controller
              name="password"
              defaultValue=""
              control={registerControl}
              rules={{ required: true }}
              render={({ field }) => (
                <Input {...field} placeholder="Ingresa aquí tu contraseña" />
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
                Cancelar
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
        </Col>
      </Row>
    </div>
  );
};
