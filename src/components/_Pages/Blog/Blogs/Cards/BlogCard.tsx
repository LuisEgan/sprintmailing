import React from "react";

interface IBlogCardProps {
  className?: string;
}

export const BlogCard = ({ className }: IBlogCardProps) => (
  <div className={className}>
    <div
      className="bg-gray-400 flex font-bold items-center justify-center text-4xl rounded-2xl"
      style={{ height: 400, width: 500 }}
    />
    <div className="flex flex-col ml-10 gap-4">
      <h2 className="text-2xl font-bold text-gray-400">
        Nullam lorem nibh, elementum
      </h2>
      <p className="text-base text-gray-400 w-3/4">
        estibulum sagittis mollis leo et vestibulum. Curabitur auctor felis
      </p>
    </div>
  </div>
);
