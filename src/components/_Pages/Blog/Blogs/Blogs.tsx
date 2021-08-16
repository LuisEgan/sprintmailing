import React from "react";

import { BlogsWrapper } from "./Blogs.style";
import { BlogCard } from "./Cards/BlogCard";

export const Blogs = () => (
  <BlogsWrapper>
    <div className="flex flex-col items-center gap-2">
      <h2 className="text-3xl font-bold text-gray-500 text-opacity-75">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </h2>
      <p className="text-lg text-gray-400">
        ed eros ante, facilisis accumsan vehicula eu, laoreet sed lacus.
        Curabitur a molestie arcu.
      </p>
    </div>
    <div className="flex flex-col justify-center items-center gap-10 mt-10">
      <BlogCard className="flex" />
      <BlogCard className="flex flex-row-reverse" />
      <BlogCard className="flex" />
    </div>
  </BlogsWrapper>
);
