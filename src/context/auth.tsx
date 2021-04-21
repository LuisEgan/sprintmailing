import { useApolloClient } from "@apollo/client";
import React from "react";
import jwt_decode from "jwt-decode";

import { USER_TOKEN_PERSIST } from "settings/constants";
import { VENDOR_ID_PERSIST } from "settings/constants";
import { USER_ID_PERSIST } from "settings/constants";
import { adalAuthContext } from "../adalConfig";

const isBrowser = typeof window !== "undefined";

type AuthProps = {
  isAuthenticated: () => boolean;
  authenticate: Function;
  getRoles: Function;
  signout: Function;
};

export const AuthContext = React.createContext({} as AuthProps);

const AuthProvider = (props: any) => {
  const client = useApolloClient();

  const isAuthenticated = (): boolean => {
    const userToken = isBrowser && localStorage.getItem(USER_TOKEN_PERSIST);
    return !!userToken;
  };

  const getRoles = (): string => {
    const token = localStorage.getItem(USER_TOKEN_PERSIST);
    const decoded: any = token && jwt_decode(token);
    return decoded && decoded["role"];
  };

  const authenticate = ({ accessToken }, cb) => {
    localStorage.setItem(USER_TOKEN_PERSIST, accessToken);
    setTimeout(cb, 100);
  };

  const signout = async () => {
    try {
      await client.clearStore();
      await client.resetStore();
      localStorage.removeItem(USER_TOKEN_PERSIST);
      localStorage.removeItem(VENDOR_ID_PERSIST);
      localStorage.removeItem(USER_ID_PERSIST);
      adalAuthContext?.logOut();
    } catch (error) {
      console.error("error: ", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        getRoles,
        signout,
      }}
    >
      <>{props.children}</>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
//dep
