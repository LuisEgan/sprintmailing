import Image from "next/image";
import { useTheme } from "next-themes";
import React from "react";
import { LOGO_DARK, LOGO_LIGHT } from "settings/constants";

export const Footer = () => {
  const { theme } = useTheme();

  return (
    <div className="bottom-0 w-full bg-gray-100 dark:bg-gray-900">
      <div className="pt-12 w-full flex flex-col text-center pb-12">
        <div>
          <Image
            src={theme === "dark" ? LOGO_DARK : LOGO_LIGHT}
            width={300}
            height={50}
          />
        </div>

        <p>Scelerisque</p>
        <span>Alburquerque, Nuevo México, EE. UU.</span>
      </div>

      <div className=" w-full text-center text-gray-400 p-6 border-t border-gray-300 dark:border-gray-800">
        <span>Copyright @ Your Landing page 2021</span>
      </div>
    </div>
  );
};
