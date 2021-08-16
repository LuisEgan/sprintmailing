import React from "react";
import { Button } from "rsuite";

interface TestimonialCardProps {
  title: string;
  description: string;
}

export const TestimonialCard = ({
  title,
  description,
}: TestimonialCardProps) => (
  <div className="flex flex-col items-center gap-4">
    <div
      className="bg-gray-500 flex font-bold items-center justify-center text-2xl"
      style={{ height: 200, width: 333 }}
    >
      333 x 200
    </div>
    <h1 className="text-2xl font-bold text-gray-500 text-opacity-75">
      {title}
    </h1>
    <p className="text-lg font-medium text-gray-400 text-center w-2/4">
      {description}
    </p>
    <Button
      appearance="ghost"
      style={{ width: 300 }}
      className="rs-btn-big bg-pink-500 bg-opacity-20"
    >
      <span className="font-bold text-pink-600"> Call to action</span>
    </Button>
  </div>
);
