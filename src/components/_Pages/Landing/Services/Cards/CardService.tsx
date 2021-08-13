import React from "react";
import { ReactSVG } from "react-svg";

interface ICardServiceProps {
  icon: string;
  title: string;
  description: string;
}

export const CardService = ({
  icon,
  title,
  description,
}: ICardServiceProps) => (
  <div className="flex flex-col items-center gap-4">
    <ReactSVG src={icon} />
    <h1 className="text-2xl font-bold text-pink-700">{title}</h1>
    <p className="text-lg font-medium text-gray-400 text-center w-2/4">
      {description}
    </p>
  </div>
);
