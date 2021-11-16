import { useLazyQuery, useMutation } from "@apollo/client";
import { Recovery } from "components/_Pages/Recovery/Forms/Recovery";
import Header from "components/Header/Header";
import PasswordInput from "components/PasswordInput";
import { useModal } from "context/modal/modal.provider";
import { gqlUser } from "gql";
import { ILoginInput, ILoginResponse } from "gql/User/queries";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Input } from "rsuite";
import {
  AFTER_LOGIN_REDIRECT,
  REFRESH_TOKEN_PERSIST,
  USER_TOKEN_PERSIST,
} from "settings/constants";
import isEmail from "validator/lib/isEmail";

export const Login = () => {
  const {
    handleSubmit: handleLoginSubmit,
    control: loginControl,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { closeModal, openModal } = useModal();
  const { t } = useTranslation("common");

  const [getUser, { data: getUserData, loading: getUserLoading }] =
    useLazyQuery(gqlUser.queries.GET_USER);

  const [login, { loading: loginLoading, error: loginError }] = useMutation<
    { login: ILoginResponse },
    { loginInput: ILoginInput }
  >(gqlUser.queries.LOGIN, {
    onCompleted({ login }) {
      const { accessToken, refreshToken } = login;
      localStorage.setItem(USER_TOKEN_PERSIST, `${accessToken}`);
      localStorage.setItem(REFRESH_TOKEN_PERSIST, `${refreshToken}`);
      getUser({
        variables: {
          accessToken,
        },
      });
    },
    onError() {},
  });

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
      console.error(e);
    }
  };

  const handleCloseModal = () => {
    closeModal();
  };

  const handleRecovery = () => {
    openModal({
      modalComponent: <Recovery />,
      size: "sm",
    });
  };

  return (
    <div className="w-full p-5 bg-white dark:bg-gray-900">
      <Header {...{ title: t("login.welcomeMessage"), description: "" }} />
      <form onSubmit={handleLoginSubmit(handleLogin)} className="mt-3">
        <label className="font-bold mb-2">{t("login.enterEmail")}</label>
        <Controller
          name="email"
          control={loginControl}
          rules={{ required: true, validate: (value) => isEmail(value) }}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              autoCapitalize="none"
              placeholder={t("login.enterEmailPlaceholder")}
            />
          )}
        />
        {errors && errors.email && (
          <small className="w-full text-red-500">
            {t("login.enterValidEmail")}
          </small>
        )}
        <label className="font-bold mt-6 mb-2 block">
          {t("login.enterPassword")}
        </label>
        <Controller
          name="password"
          control={loginControl}
          rules={{ required: true }}
          defaultValue=""
          render={({ field }) => (
            <PasswordInput
              {...field}
              type="password"
              autoCapitalize="none"
              placeholder={t("login.enterEmailPlaceholder")}
            />
          )}
        />
        {errors && errors.password && (
          <small className="w-full text-red-500">
            {t("login.enterPasswordError")}
          </small>
        )}
        <div
          style={{ color: "rgba(216, 216, 216, 0.5)" }}
          aria-hidden="true"
          className="flex justify-end mt-3 font-bold mt-8 mb-8"
        >
          {t("login.forgotPassword")}
          <div
            onClick={handleRecovery}
            onKeyPress={handleRecovery}
            role="button"
            tabIndex={0}
            className="ml-2 underline inline"
          >
            {t("login.recoverPassword")}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button
            appearance="ghost"
            style={{ width: 150 }}
            onClick={handleCloseModal}
            className="rs-btn-big"
          >
            {t("login.cancelButton")}
          </Button>
          <Button
            appearance="primary"
            style={{ width: 150 }}
            className="ml-2 rs-btn-big"
            loading={loginLoading || getUserLoading}
            type="submit"
          >
            {t("login.accessButton")}
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
