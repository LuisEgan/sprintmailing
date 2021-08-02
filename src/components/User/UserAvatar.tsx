import React from "react";
import { IUser } from "types/User.types";

export interface IUserAvatarProps {
  user: IUser;
  showName: boolean;
}

const UserAvatar = ({ user, showName }: IUserAvatarProps) => {
  const initialsName: string[] = user?.name
    ?.split(" ")
    .map((word) => word.length > 0 && word[0].toUpperCase()) || [""];

  const intialsLastname: string[] = user?.lastname
    ?.split(" ")
    .map((word) => word.length > 0 && word[0].toUpperCase()) || [""];

  return (
    <div className="flex items-center">
      {user?.profileImage || user?.name === "Captain" ? (
        <>
          <div className="w-10 mr-2 bg-center bg-cover h-10 rounded-full border-2 border-black dark:border-white bg-gray-900 dark:bg-white">
            <img
              src={
                user?.name === "Captain"
                  ? "/images/avatar/captain.png"
                  : user?.profileImage
              }
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
          <div className="w-8 h-8 relative mr-4">
            <div className="absolute inset-0 bg-cover z-0 bg-purple-900 w-10 mr-2 bg-center h-10 rounded-full border-2 border-black dark:border-white">
              <div className="absolute inset-0 flex justify-center items-center font-semibold text-xs">
                {`${initialsName[0]}${intialsLastname[0]}`}
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
};

export default UserAvatar;
