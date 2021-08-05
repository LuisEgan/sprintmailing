import React from "react";
import { DEFAULT_PROFILE_IMAGE } from "settings/constants";
import { IUser } from "types/User.types";

export interface IUserAvatarProps {
  user: IUser;
  showName: boolean;
  size?: number;
}

const UserAvatar = ({ user, showName, size = 50 }: IUserAvatarProps) => (
  <div className="flex items-center" style={{ width: size, height: size }}>
    {user?.profileImage && user?.profileImage !== DEFAULT_PROFILE_IMAGE ? (
      <>
        <div
          className=" mr-2 bg-center bg-cover rounded-full border-2 border-black dark:border-white bg-gray-900 dark:bg-white"
          style={{ width: size, height: size }}
        >
          <img
            src={user?.profileImage}
            alt="No Result"
            width="230px"
            className="rounded-full"
          />
        </div>
        {showName && (
          <p className="capitalize">
            {user?.name} {user?.lastname}
          </p>
        )}
      </>
    ) : (
      <>
        <div className="relative mr-4" style={{ width: size, height: size }}>
          <div
            className="absolute inset-0 bg-cover z-0 bg-purple-900  mr-2 bg-center rounded-full border-2 border-current-500"
            style={{ width: size, height: size }}
          >
            <div
              className="absolute inset-0 flex justify-center items-center font-semibold text-md"
              style={{ fontSize: size * 0.32 }}
            >
              {`${user?.name?.charAt(0) || ""}${
                user?.lastname?.charAt(0) || ""
              }`}
            </div>
          </div>
        </div>
        {showName && (
          <p className="capitalize">
            {user?.name} {user?.lastname}
          </p>
        )}
      </>
    )}
  </div>
);

export default UserAvatar;
