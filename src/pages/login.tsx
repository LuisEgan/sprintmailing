import Login from "components/_Pages/Login";
import { useAuth } from "context/auth";
import { useRouter } from "next/router";
import React from "react";
import { AFTER_LOGIN_REDIRECT } from "settings/constants";

const LoginPage = () => {
  const router = useRouter();

  const { isAuthenticated } = useAuth();

  if (isAuthenticated()) router.push(AFTER_LOGIN_REDIRECT);

  return <Login />;
};

export default LoginPage;
