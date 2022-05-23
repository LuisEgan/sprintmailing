import { useLazyQuery, useMutation } from "@apollo/client";
import Header from "components/_Custom/Header/Header";
import PasswordInput from "components/_Custom/PasswordInput";
import { useModal } from "context/modal/modal.provider";
import { gqlUser } from "gql";
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

export const Register = () => {
  const {
    handleSubmit: handleRegisterSubmit,
    control: registerControl,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { closeModal } = useModal();

  const { t } = useTranslation("common");

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
        console.error(error);
      }
    }
  };

  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <div className="w-full p-5 bg-white dark:bg-gray-900">
      <Header {...{ title: t("register.registerTitle"), description: "" }} />
      <form onSubmit={handleRegisterSubmit(handleRegister)}>
        <label className="font-bold" htmlFor="name">
          {t("register.nameQuestion")}
        </label>

        <Controller
          name="name"
          defaultValue=""
          control={registerControl}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              {...field}
              placeholder={t("register.nameQuestionPlaceholder")}
            />
          )}
        />
        {errors && errors.name && (
          <small className="w-full text-red-500">
            {t("register.nameQuestionError")}
          </small>
        )}
        <label className="font-bold mt-2 block">
          {" "}
          {t("register.lastNameQuestion")}
        </label>
        <Controller
          name="lastname"
          defaultValue=""
          control={registerControl}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              {...field}
              placeholder={t("register.lastNameQuestionPlaceholder")}
            />
          )}
        />
        {errors && errors.lastname && (
          <small className="w-full text-red-500">
            {t("register.lastNameQuestionError")}
          </small>
        )}

        <label className="font-bold mt-2 block">
          {t("register.emailQuestion")}
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
              placeholder={t("register.emailQuestionPlaceholder")}
            />
          )}
        />
        {errors && errors.email && (
          <small className="w-full text-red-500">
            {t("register.emailQuestionError")}
          </small>
        )}

        <label className="font-bold mt-2 block">
          {t("register.enterPassword")}
        </label>

        <Controller
          name="password"
          defaultValue=""
          control={registerControl}
          rules={{ required: true }}
          render={({ field }) => (
            <PasswordInput
              {...field}
              placeholder={t("register.enterPasswordPlaceholder")}
            />
          )}
        />
        {errors && errors.password && (
          <small className="w-full text-red-500">
            {t("register.enterPasswordError")}
          </small>
        )}

        <div
          aria-hidden="true"
          className="flex justify-end mt-3 font-bold text-gray-500"
        >
          {t("register.forgotPassword")}
          <div style={{ cursor: "pointer" }} className="ml-2 underline">
            {t("register.recoverPassword")}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button
            appearance="ghost"
            style={{ width: 150 }}
            onClick={handleCloseModal}
            className="rs-btn-big"
          >
            <span className="text-red-500">{t("cancelButton")}</span>
          </Button>
          <Button
            appearance="primary"
            style={{ width: 150 }}
            className="ml-2 rs-btn-big"
            type="submit"
            loading={signupLoading || getUserLoading}
          >
            {t("accessButton")}
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
