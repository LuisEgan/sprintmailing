import { IUser } from "utils/Types/User.types";
import { createContext, Dispatch, useContext } from "react";

interface IProfileContext {
  user: IUser;
  dispatch: Dispatch<unknown>;
}

const ProfileContextMethods = {
  user: null,
  dispatch: () => {},
};

export const ProfileContext = createContext<IProfileContext>(
  ProfileContextMethods,
);

export const useProfile = () => useContext(ProfileContext);
