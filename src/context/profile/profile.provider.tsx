import React, { useContext, useEffect, useReducer } from "react";
import { useQuery } from "@apollo/client";
import { gqlUser } from "gql";

import { IUser } from "utils/Types/User.types";
import { ProfileContext } from "./profile.context";
import { AuthContext } from "../auth";

type Action =
  | { type: "UPDATE_SELECTED_VENDOR"; payload: any }
  | { type: "SET_USER_DATA"; payload: any };

function reducer(state: any, action: Action): any {
  switch (action.type) {
    case "SET_USER_DATA":
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
}

type ProfileProviderProps = {};

export const ProfileProvider: React.FunctionComponent<ProfileProviderProps> = ({
  children,
}) => {
  const { isAuthenticated } = useContext(AuthContext);

  const { data: userData, error } = useQuery<
    { user: IUser },
    { accessToken: string }
  >(gqlUser.queries.GET_FULL_USER, {
    skip: !isAuthenticated(),
    variables: {
      accessToken:
        typeof window === "undefined"
          ? ""
          : localStorage.getItem("accessToken"),
    },
  });

  const [, dispatch] = useReducer(reducer, { userData });

  useEffect(() => {
    if (userData) {
      dispatch({
        type: "SET_USER_DATA",
        payload: userData,
      });
    }
  }, [userData]);

  if (error) return <div>{error.message}</div>;

  return (
    <ProfileContext.Provider value={{ user: userData?.user, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
};
