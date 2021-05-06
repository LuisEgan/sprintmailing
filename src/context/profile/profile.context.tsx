import { IUser } from "lib/Types/User.types";
import { createContext, Dispatch } from "react";

export const ProfileContext = createContext<
  Partial<{ data: { user: IUser }; dispatch: Dispatch<any> }>
>({});
