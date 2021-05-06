import { IUser } from "lib/Types/User.types";
import { createContext, Dispatch, useContext } from "react";

export const ProfileContext = createContext<
  Partial<{ user: IUser; dispatch: Dispatch<any> }>
>({});

export const useProfile = () => useContext(ProfileContext);
