import React, { useContext, useEffect, useReducer } from "react";
import { ProfileContext } from "./profile.context";
import { useQuery } from "@apollo/client";
import { AuthContext } from "../auth";
import { gqlUser } from "gql";
import { IUser } from "lib/Types/User.types";

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
  const { data, error } = useQuery<{ user: IUser }, { accessToken: string }>(
    gqlUser.queries.GET_FULL_USER,
    {
      skip: !isAuthenticated(),
      variables: {
        accessToken:
          typeof window === "undefined"
            ? ""
            : localStorage.getItem("accessToken"),
      },
    }
  );

  const [, dispatch] = useReducer(reducer, { data });

  useEffect(() => {
    if (data) {
      dispatch({
        type: "SET_USER_DATA",
        payload: data,
      });
    }
  }, [data]);

  if (error) return <div>{error.message}</div>;

  return (
    <ProfileContext.Provider value={{ data, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
};
